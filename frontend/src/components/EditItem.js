import React, { useState, useEffect, useCallback } from "react";
import { getItemById, updateItem } from "../services/itemService";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditItem.css";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    product_ID: "",
    Name: "",
    Category: "",
    Price: "",
    Stock_Quantity: "",
  });

  const loadItem = useCallback(async () => {
    try {
      const result = await getItemById(id);
      setItem(result.data.items);
    } catch (error) {
      console.error("Failed to load item:", error);
    }
  }, [id]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateItem(id, item);
      toast.success("Edit successfully!");
      navigate("/productlist");
    } catch (error) {
      console.error("Failed to update item:", error);
      toast.error("Failed to update item");
    }
  };

  return (
    <div className="container">
      <h2>Edit Item</h2>
      <div className="form-container">
        <label>Product ID</label>
        <input type="text" name="product_ID" value={item.product_ID} onChange={handleChange} required />
        <label>Name</label>
        <input type="text" name="Name" value={item.Name} onChange={handleChange} required />
        <label>Category</label>
        <input type="text" name="Category" value={item.Category} onChange={handleChange} required />
        <label>Price</label>
        <input type="number" name="Price" value={item.Price} onChange={handleChange} required />
        <label>Stock Quantity</label>
        <input type="text" name="Stock_Quantity" value={item.Stock_Quantity} onChange={handleChange} required />
        <button onClick={handleSubmit}>Update Item</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditItem;