import React, { useState } from "react";
import { addVendor } from "../../services/vendorService";
import { useNavigate } from "react-router-dom";
import "./AddVendor.css";

const AddVendor = () => {
  const [vendor, setVendor] = useState({
    vendorName: "",
    email: "",
    phoneNumber: "",
    address: "",
    registrationDate: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (name, value) => {
    let errorMsg = "";

    if (name === "vendorName") {
      if (!value.trim()) errorMsg = "Vendor Name is required";
      else if (value.length < 3 || value.length > 50) errorMsg = "Vendor Name must be between 3-50 characters";
    }

    if (name === "email") {
      if (!value.trim()) errorMsg = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = "Invalid email format";
    }

    if (name === "phoneNumber") {
      if (!value.trim()) errorMsg = "Phone Number is required";
      else if (!/^\d{10}$/.test(value)) errorMsg = "Phone Number must be exactly 10 digits";
    }

    if (name === "address") {
      if (!value.trim()) errorMsg = "Address is required";
      else if (value.length < 5) errorMsg = "Address must be at least 5 characters long";
    }

    if (name === "registrationDate") {
      if (!value.trim()) errorMsg = "Registration Date is required";
      else if (isNaN(Date.parse(value))) errorMsg = "Invalid registration date";
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });

    const errorMsg = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async () => {
    let newErrors = {};

    Object.keys(vendor).forEach((key) => {
      const errorMsg = validate(key, vendor[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await addVendor(vendor);
      navigate("/vendorList");
    } catch (err) {
      console.error("Error adding vendor:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <h2>Add Vendor</h2>
      <div className="form-container">
        <label>Vendor Name</label>
        <input type="text" name="vendorName" value={vendor.vendorName} onChange={handleChange} />
        {errors.vendorName && <span className="error">{errors.vendorName}</span>}

        <label>Email</label>
        <input type="email" name="email" value={vendor.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={vendor.phoneNumber} onChange={handleChange} />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

        <label>Address</label>
        <input type="text" name="address" value={vendor.address} onChange={handleChange} />
        {errors.address && <span className="error">{errors.address}</span>}

        <label>Registration Date</label>
        <input type="date" name="registrationDate" value={vendor.registrationDate} onChange={handleChange} />
        {errors.registrationDate && <span className="error">{errors.registrationDate}</span>}

        <button onClick={handleSubmit} disabled={Object.keys(errors).some((key) => errors[key])}>
          Add Vendor
        </button>
      </div>
    </div>
  );
};

export default AddVendor;