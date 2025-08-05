const Order = require("../models/dorderModel");
const mongoose = require("mongoose");


// Create Order
    const createOrder = async (req, res) => {
    try {
      console.log("Received Order Data:", req.body); // Log incoming request payload for debugging
      
      const { Order_ID, product_ID, quantity_Ordered, totalPrice, phoneNumber, status } = req.body;
  
      // Validate phone number format
      if (!/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number. Must be 10 digits." });
      }
  
      // Create a new order
      const newOrder = new Order({ Order_ID, product_ID, quantity_Ordered, totalPrice, phoneNumber, status });
      await newOrder.save();
  
      console.log("Saved Order:", newOrder); // Log the newly created order
      res.status(201).json(newOrder); // Respond with the created order
    } catch (error) {
      console.error("Error in createOrder:", error.message); // Log any error that occurs
      res.status(400).json({ message: error.message });
    }
  };
  

// Get All Orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Order
const updateOrder = async (req, res) => {
    try {
      console.log("Update request body:", req.body); // Log the incoming payload
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error.message); // Log errors
      res.status(400).json({ message: error.message });
    }
  };
  


// Delete Order
const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };
