import React, { useEffect, useState, useRef } from "react";
import { getVendors, deleteVendor } from "../../services/vendorService";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./VendorList.css";
import logo from "../../logo.png";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const ComponentsRef = useRef();

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const result = await getVendors();
      console.log("Fetched data:", result.data);
      setAllVendors(result.data || []);
      setVendors(result.data || []);
      setNoResults(false);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
      setVendors([]);
      setNoResults(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVendor(id);
      loadVendors();
    } catch (error) {
      console.error("Failed to delete vendor:", error);
    }
  };

  const handleSearch = () => {
    const filteredVendors = allVendors.filter((vendor) =>
      Object.values(vendor).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setVendors(filteredVendors);
    setNoResults(filteredVendors.length === 0);
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    doc.setFontSize(22);
    doc.text("Vendor Report", 14, 20);
    doc.setFontSize(16);
    doc.text("Vendor Details Report", 14, 30);
    doc.setFontSize(12);
    doc.text(`Generated on: ${date}`, 14, 40);

    doc.autoTable({
      startY: 50,
      head: [["Vendor Name", "Email", "Phone", "Address", "Reg. Date"]],
      body: vendors.map((vendor) => [
        vendor.vendorName,
        vendor.email,
        vendor.phoneNumber,
        vendor.address,
        new Date(vendor.registrationDate).toLocaleDateString(),
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
      styles: { cellPadding: 3, fontSize: 10 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 10 },
    });

    doc.save("Vendor_Report.pdf");
  };

  const handleSendReport = () => {
    const phoneNumber = "+94785824985";
    const message = "Selected Order Reports";
    window.open(
      `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="main-content">
      <div className="page-background">
        <h2>Vendor List</h2>
        <Link to="/addvendor" className="add-button">Add Vendor</Link>

        <div className="search-bar">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search Vendor Details"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {vendors.length > 0 ? (
          <table className="vendor-table" ref={ComponentsRef}>
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phoneNumber}</td>
                  <td>{vendor.address}</td>
                  <td>{new Date(vendor.registrationDate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/editvendor/${vendor._id}`} className="edit-button">Edit</Link>
                    <button onClick={() => handleDelete(vendor._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No vendors found. Please add vendors or try searching again.</p>
        )}

        <button onClick={generatePDFReport} className="download-button">Download PDF</button>
        <br /><br />
        <button onClick={handleSendReport} className="whatsapp-button">Send WhatsApp Report</button>
      </div>
    </div>
  );
};

export default VendorList;
