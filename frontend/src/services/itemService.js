import axios from "axios";

const API_URL = "http://localhost:5000/items";

export const getItems = async () => {
  return await axios.get(API_URL);
};

export const addItem = async (item) => {
  return await axios.post(API_URL, item);
};

export const getItemById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const updateItem = async (id, item) => {
  return await axios.put(`${API_URL}/${id}`, item);
};

export const deleteItem = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};