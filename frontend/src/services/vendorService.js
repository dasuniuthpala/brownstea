import axios from "axios";


const API_URL = "http://localhost:5000/dvendors";

export const getVendors = async () => {
  return await axios.get(API_URL);
};


export const addVendor = async (vendor) => {
  return await axios.post(API_URL, vendor);
};

export const getVendorById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const updateVendor = async (id, vendor) => {
  return await axios.put(`${API_URL}/${id}`, vendor);
};

export const deleteVendor = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
