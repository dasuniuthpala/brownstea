import React, { useState, useEffect, useRef, useCallback } from "react";
import { getOrders, deleteOrder } from "../../services/orderService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from '../../logo.png';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import "./OrderList.css"; 

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthlyTotal, setMonthlyTotal] = useState({});

  const loadOrders = useCallback(async () => {
    try {
      const result = await getOrders();
      setOrders(result.data);
      setMonthlyTotal(calculateMonthlyTotal(result.data));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      loadOrders();
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order!");
    }
  };

  const handleSearch = () => {
    const filteredOrders = orders.filter((order) =>
      Object.values(order).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setOrders(filteredOrders);
    setNoResults(filteredOrders.length === 0);
  };

  // Calculate Monthly Total Price
  const calculateMonthlyTotal = (ordersData) => {
    const totals = {};
    ordersData.forEach((order) => {
      const date = new Date(order.orderDate);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      totals[monthYear] = (totals[monthYear] || 0) + order.totalPrice;
    });
    return totals;
  };

  //generate Report
  const generatePDFReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    const img = new Image();
    img.src = logo;
    img.onload = function () {
      doc.addImage(img, "png", doc.internal.pageSize.getWidth() - 44, 10, 30, 30);
      doc.setFontSize(22).setFont("helvetica", "bold").text("Order Report", 14, 20);
      doc.setFontSize(16).text("Order Report Details", 14, 30);
      doc.setFontSize(12).text(`${date}`, 14, 40);
      doc.line(14, 44, doc.internal.pageSize.getWidth() - 14, 44);
      let currentY = 50;

      const tableData = orders.map((order) => [
        order.Order_ID, order.product_ID, order.quantity_Ordered,
        order.totalPrice, order.phoneNumber, order.status,
        new Date(order.orderDate).toLocaleDateString(),
      ]);

      doc.autoTable({
        startY: currentY,
        head: [["Order ID", "Product ID", "Quantity", "Total Price", "Phone", "Status", "Date"]],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { cellPadding: 3, fontSize: 10, halign: "left" },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 10 },
      });

      // Add Monthly Total Section
      currentY = doc.autoTable.previous.finalY + 10;
      doc.setFontSize(14).setFont("helvetica", "bold").text("Monthly Total Price", 14, currentY);
      currentY += 5;
      Object.keys(monthlyTotal).forEach((month) => {
        doc.text(`${month}: Rs. ${monthlyTotal[month].toFixed(2)}`, 14, (currentY += 7));
      });

      doc.save("Order_Report.pdf");
    };
  };

  const handleSendReport = () => {
    const phoneNumber = "+94785824985";
    const message = "Selected Order Reports";
    window.open(
      `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const ComponentsRef = useRef();
  // Removed unused handlePrint function

  //pie chart
  const chartData = orders.map(order => ({
    name: `ProductID ${order.product_ID}`,
    value: order.quantity_Ordered,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#DC7633"];

  return (
    <div className="main-content">
      <div className="page-container">
        <h2>Order List</h2>

        <Link to="/addorder" className="add-button">Add Order</Link>

        <div className="search-bar">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="Search"
            placeholder="Search Orders Details"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

      <div className="scrollable-container">  
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Quantity Ordered</th>
              <th>Total Price</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.Order_ID}</td>
                  <td>{order.product_ID}</td>
                  <td>{order.quantity_Ordered}</td>
                  <td>Rs. {order.totalPrice.toFixed(2)}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/editOrder/${order._id}`} className="edit-button">Edit</Link>
                    <button onClick={() => handleDelete(order._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8">No Orders Found</td></tr>
            )}
          </tbody>
        </table>

        <h3>Monthly Total Price</h3>
        <ul>
          {Object.keys(monthlyTotal).map((month) => (
            <li key={month}>{month}: Rs. {monthlyTotal[month].toFixed(2)}</li>
          ))}
        </ul>

        <button onClick={generatePDFReport} className="download-button">Generate Report</button>
        <br/>
        <button onClick={handleSendReport} className="whatsapp-button">Send WhatsApp message</button>

        <h3>Order Quantity Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default OrderList; 
