import React, { useState } from "react";
import { addOrder } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import "./AddOrder.css"; // Add CSS for error styling

const AddOrder = () => {
  const [order, setOrder] = useState({
    Order_ID: "",
    product_ID: "",
    quantity_Ordered: "",
    totalPrice: "",
    phoneNumber: "",
    status: "Pending",
    orderDate: new Date("2025-06-25T14:58:00+05:30").toISOString().slice(0, 10),
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validate = (name, value) => {
    let errorMsg = "";

    if (name === "Order_ID" && !value.trim()) errorMsg = "Order ID is required";

    if (name === "product_ID" && !value.trim()) errorMsg = "Product ID is required";

    if (name === "quantity_Ordered") {
      if (!value) errorMsg = "Quantity is required";
      else if (value < 10 || value > 10000) errorMsg = "Quantity must be between 10 and 10,000";
    }

    if (name === "totalPrice") {
      if (!value) errorMsg = "Total Price is required";
      else if (value < 5) errorMsg = "Total price must be at least 5";
    }

    if (name === "phoneNumber") {
      if (!value.trim()) errorMsg = "Phone Number is required";
      else if (!/^\d{10}$/.test(value)) errorMsg = "Invalid phone number. Must be 10 digits.";
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrder({ ...order, [name]: value });

    // Validate the field on change
    const errorMsg = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate all fields before submission
    Object.keys(order).forEach((key) => {
      const errorMsg = validate(key, order[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);

    // If errors exist, prevent submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // If no errors, proceed with submission
    try {
      await addOrder(order);
      navigate("/orderlist");
    } catch (err) {
      console.error("Error adding order:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Add Order</h2>
        <div className="form-container">
          <label>Order ID</label>
          <input type="text" name="Order_ID" value={order.Order_ID} onChange={handleChange} />
          {errors.Order_ID && <span className="error">{errors.Order_ID}</span>}

          <label>Product ID</label>
          <input type="text" name="product_ID" value={order.product_ID} onChange={handleChange} />
          {errors.product_ID && <span className="error">{errors.product_ID}</span>}

          <label>Quantity Ordered</label>
          <input type="number" name="quantity_Ordered" value={order.quantity_Ordered} onChange={handleChange} />
          {errors.quantity_Ordered && <span className="error">{errors.quantity_Ordered}</span>}

          <label>Total Price</label>
          <input type="number" name="totalPrice" value={order.totalPrice} onChange={handleChange} />
          {errors.totalPrice && <span className="error">{errors.totalPrice}</span>}

          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={order.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

          <label>Status</label>
          <select name="status" value={order.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit" onClick={handleSubmit} disabled={Object.keys(errors).some((key) => errors[key])}>
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;