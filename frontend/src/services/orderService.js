import axios from "axios";

const API_URL = "http://localhost:5000/dorders"; 


export const getOrders = async () => {
  try {
    console.log("Fetching orders from:", API_URL); // Debugging
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("Axios GET /orders error:", error); // Log error details
    throw error;
  }
};


export const addOrder = async (order) => {
  try {
    console.log("Sending order:", order); // Debug the payload
    const response = await axios.post("http://localhost:5000/dorders", order, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Order added successfully:", response.data); // Log success
    return response.data;
  } catch (error) {
    console.error("Error adding order:", error.response?.data || error.message); // Log detailed error
    throw error;
  }
};


export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const updateOrder = async (id, order) => {
  try {
    console.log("Sending update request:", { id, order }); // Debug outgoing payload
    const response = await axios.put(`http://localhost:5000/dorders/${id}`, order);
    console.log("Update success response:", response.data); // Log success
    return response.data;
  } catch (error) {
    console.error("Update error response:", error.response?.data || error.message); // Log error
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};

