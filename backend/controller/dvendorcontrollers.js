const DVendor = require("../models/dvendormodel");

const getAllVendors = async (req, res) => {
    try {
      const vendors = await DVendor.find();
      res.status(200).json(vendors); // Send vendors array directly
    } catch (err) {
      res.status(500).json({ message: "Error retrieving vendors" });
    }
  };
  

const addVendor = async (req, res) => {
    const { vendorName, email, phoneNumber, address, registrationDate } = req.body;
    
    try {
        const newVendor = new DVendor({ vendorName, email, phoneNumber, address, registrationDate });
        await newVendor.save();
        res.status(201).json(newVendor);
    } catch (err) {
        res.status(500).json({ message: "Error adding vendor" });
    }
};

const getVendorById = async (req, res) => {
    try {
        const vendor = await DVendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving vendor" });
    }
};

const updateVendor = async (req, res) => {
    try {
        const vendor = await DVendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ message: "Error updating vendor" });
    }
};

const deleteVendor = async (req, res) => {
    try {
        const vendor = await DVendor.findByIdAndDelete(req.params.id);
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        res.status(200).json({ message: "Vendor deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting vendor" });
    }
};

module.exports = { getAllVendors, addVendor, getVendorById, updateVendor, deleteVendor };
