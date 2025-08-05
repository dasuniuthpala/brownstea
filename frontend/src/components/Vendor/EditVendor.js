import React, { useState, useEffect, useCallback } from "react";
import { getVendorById, updateVendor } from "../../services/vendorService";
import { useParams, useNavigate } from "react-router-dom";
import "./EditVendor.css";

const EditVendor = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState({
    vendorName: "",
    email: "",
    phoneNumber: "",
    address: "",
    registrationDate: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadVendor = useCallback(async () => {
    try {
      const result = await getVendorById(id);
      setVendor(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vendor:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadVendor();
  }, [loadVendor]);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateVendor(id, vendor);
      navigate("/vendorlist");
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  if (loading) {
    return <p>Loading vendor data...</p>;
  }

  return (
    <div className="container">
      <h2>Edit Vendor</h2>
      <div className="form-container">
        <label>Vendor Name</label>
        <input
          type="text"
          name="vendorName"
          value={vendor.vendorName}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={vendor.email}
          onChange={handleChange}
          required
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={vendor.phoneNumber}
          onChange={handleChange}
          required
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={vendor.address}
          onChange={handleChange}
          required
        />
        <label>Registration Date</label>
        <input
          type="date"
          name="registrationDate"
          value={vendor.registrationDate?.slice(0, 10)}
          onChange={handleChange}
          required
        />
        <button onClick={handleSubmit}>Update Vendor</button>
      </div>
    </div>
  );
};

export default EditVendor;