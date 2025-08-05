import React, { useEffect, useState, useRef, useCallback } from "react";
import { getItems, deleteItem } from "../services/itemService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../logo.png";
import "./ItemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const ComponentsRef = useRef();

  const loadItems = useCallback(async () => {
    try {
        const result = await getItems();
        setItems(result.data.items);
        result.data.items.forEach((item) => {
            if (item.Stock_Quantity < 100) {
                toast.warn(`Stock is low for ${item.Name} (Only ${item.Stock_Quantity} left)`);
            }
        });
    } catch (error) {
        console.error("Failed to load items:", error);
        setItems([]);
    }
}, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleDelete = async (id) => {
    await deleteItem(id);
    toast.success("Deleted Successfully.");
    loadItems();
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setItems(filteredItems);
    setNoResults(filteredItems.length === 0);
  };

  const handleSendReport = () => {
    const phoneNumber = "+94785824985";
    const message = "Selected Item Reports";
    window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, "_blank");
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    const img = new Image();
    img.src = logo;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const base64Logo = canvas.toDataURL("image/png");

      doc.addImage(base64Logo, "PNG", doc.internal.pageSize.getWidth() - 44, 10, 30, 30);
      doc.setFontSize(22);
      doc.text("Item Report", 14, 20);
      doc.setFontSize(16);
      doc.text("Item Report Details", 14, 30);
      doc.setFontSize(12);
      doc.text(`${date}`, 14, 40);

      let lowStockItems = items.filter(item => item.Stock_Quantity < 120);
      if (lowStockItems.length > 0) {
        doc.setTextColor(255, 0, 0);
        doc.setFontSize(14);
        doc.text("Warning: The following items have low stock!", 14, 50);
        doc.setFontSize(12);
        lowStockItems.forEach((item, index) => {
          doc.text(`${index + 1}. ${item.Name} (Only ${item.Stock_Quantity} left)`, 14, 60 + index * 6);
        });
        doc.setTextColor(0, 0, 0);
      }

      doc.autoTable({
        startY: 60 + (lowStockItems.length * 6) + 10,
        head: [["Product ID", "Name", "Category", "Price ($/kg)", "Stock Quantity"]],
        body: items.map((item) => [
          item.product_ID,
          item.Name,
          item.Category,
          item.Price,
          item.Stock_Quantity,
        ]),
        theme: "grid",
        headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
        styles: { cellPadding: 3, fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 10 },
      });

      doc.save("Item_Report.pdf");
    };
  };

  const chartData = items.map((item) => ({
    name: item.Name,
    price: item.Price,
  }));

  return (
    <div className="main-content">
      <div className="page-container">
        <h2>Products List</h2>
        <Link to="/add" className="add-button">Add Item</Link>

        <div className="search-bar">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="Search"
            placeholder="Search Items Details"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {noResults && <p>No results found.</p>}

        <div className="scrollable-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price-$ (1kg)</th>
                <th>Stock Quantity (1kg packet)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.product_ID}</td>
                  <td>{item.Name}</td>
                  <td>{item.Category}</td>
                  <td>{item.Price}</td>
                  <td>
                    {item.Stock_Quantity}
                    {item.Stock_Quantity < 100 && (
                      <span style={{ color: "red", fontWeight: "bold" }}> (Low Stock!)</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/edit/${item._id}`} className="edit-button">Edit</Link>
                    <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={generatePDFReport} className="download-button">Download Report</button>
        <br /><br />
        <button onClick={handleSendReport} className="whatsapp-button">Send WhatsApp Message</button>

        <h3>Product Price Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#51A687" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ItemList;
