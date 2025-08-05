import React, { useState, useEffect, useCallback } from "react";
import { getOrderById, updateOrder } from "../../services/orderService"; 
import { useParams, useNavigate } from "react-router-dom";
import "./EditOrder.css";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    Order_ID: "",
    product_ID: "",
    quantity_Ordered: "",
    totalPrice: "",
    phoneNumber: "",
    status: "",
    orderDate: "",
  });

  const loadOrder = useCallback(async () => {
    try {
      const result = await getOrderById(id);
      console.log("Fetched order data:", result.data);
      setOrder(result.data.order);
    } catch (error) {
      console.error("Error fetching order:", error.response?.data || error.message);
    }
  }, [id]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting updated order:", order);
      await updateOrder(id, order);
      navigate("/orderlist");
    } catch (error) {
      console.error("Error updating order:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <h2>Edit Order</h2>
      <div className="form-container">
        <label>Order ID</label>
        <input
          type="text"
          name="Order_ID"
          value={order.Order_ID}
          onChange={handleChange}
          required
          disabled
        />
        <label>Product ID</label>
        <input
          type="text"
          name="product_ID"
          value={order.product_ID}
          onChange={handleChange}
          required
        />
        <label>Quantity</label>
        <input
          type="number"
          name="quantity_Ordered"
          value={order.quantity_Ordered}
          onChange={handleChange}
          required
        />
        <label>Price</label>
        <input
          type="number"
          name="totalPrice"
          value={order.totalPrice}
          onChange={handleChange}
          required
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={order.phoneNumber}
          onChange={handleChange}
          required
        />
        <label>Status</label>
        <input
          type="text"
          name="status"
          value={order.status}
          onChange={handleChange}
          required
        />
        <label>Order Date</label>
        <input
          type="date"
          name="orderDate"
          value={order.orderDate}
          onChange={handleChange}
          required
        />
        <button onClick={handleSubmit}>Update Order</button>
      </div>
    </div>
  );
};

export default EditOrder;