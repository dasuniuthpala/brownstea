import React, { useState } from "react";
import { addItem } from "../services/itemService";
import { useNavigate } from "react-router-dom";
import "./AddItem.css";

const AddItem = () => {
  const [item, setItem] = useState({
    product_ID: "",
    Name: "",
    Category: "",
    Price: "",
    Stock_Quantity: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (name, value) => {
    let errorMsg = "";

    if (name === "product_ID" && !value.trim()) {
      errorMsg = "Product ID is required";
    }

    if (name === "Name") {
      if (!value.trim()) errorMsg = "Name is required";
      else if (value.length < 5 || value.length > 50) errorMsg = "Name must be 5-50 characters";
      else if (!/^[A-Za-z\s]+$/.test(value)) errorMsg = "Name must contain only letters and spaces";
    }

    if (name === "Category") {
      if (!value.trim()) errorMsg = "Category is required";
      else if (!/^[A-Za-z\s]+$/.test(value)) errorMsg = "Category must contain only letters and spaces";
    }

    if (name === "Price") {
      if (!value) errorMsg = "Price is required";
      else if (value < 5 || value > 500) errorMsg = "Price must be between 5 and 500";
    }

    if (name === "Stock_Quantity") {
      if (!value) errorMsg = "Stock Quantity is required";
      else if (value < 99 || value > 5000) errorMsg = "Stock Quantity must be between 99 and 5000";
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });

    const errorMsg = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async () => {
    let newErrors = {};

    Object.keys(item).forEach((key) => {
      const errorMsg = validate(key, item[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await addItem(item);
      navigate("/productlist");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add Item</h2>
      <div className="form-container">
        <label>Product ID</label>
        <input type="text" name="product_ID" value={item.product_ID} onChange={handleChange} />
        {errors.product_ID && <span className="error">{errors.product_ID}</span>}

        <label>Name</label>
        <input type="text" name="Name" value={item.Name} onChange={handleChange} />
        {errors.Name && <span className="error">{errors.Name}</span>}

        <label>Category</label>
        <input type="text" name="Category" value={item.Category} onChange={handleChange} />
        {errors.Category && <span className="error">{errors.Category}</span>}

        <label>Price</label>
        <input type="number" name="Price" value={item.Price} onChange={handleChange} />
        {errors.Price && <span className="error">{errors.Price}</span>}

        <label>Stock Quantity</label>
        <input type="number" name="Stock_Quantity" value={item.Stock_Quantity} onChange={handleChange} />
        {errors.Stock_Quantity && <span className="error">{errors.Stock_Quantity}</span>}

        <button onClick={handleSubmit} disabled={Object.keys(errors).some((key) => errors[key])}>
          Add Item
        </button>
      </div>
    </div>
  );
};

export default AddItem;