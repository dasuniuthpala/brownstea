import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './FeedbackList.css';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dfeedbacks/");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      alert("Failed to fetch feedbacks");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:5000/api/dfeedbacks/delete/${id}`);
        alert("Feedback deleted successfully!");
        fetchFeedbacks();
      } catch (err) {
        console.error("Error deleting feedback:", err);
        alert("Failed to delete feedback");
      }
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    doc.setFontSize(22);
    doc.text("Feedback Report", 14, 20);
    doc.setFontSize(16);
    doc.text("Customer Feedback Summary", 14, 30);
    doc.setFontSize(12);
    doc.text(`Generated on: ${date}`, 14, 40);
  
    doc.autoTable({
      startY: 50,
      head: [["Feedback ID", "User ID", "Description", "Rating", "Status"]],
      body: feedbacks.map((fb) => [
        fb.feedbackId,
        fb.userId,
        fb.description,
        `${fb.rating}/5`,
        fb.status,
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
      styles: { cellPadding: 3, fontSize: 10 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
  
    doc.save("Feedback_Report.pdf");
  };

  const filteredFeedbacks = feedbacks.filter(fb =>
    fb.feedbackId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fb.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fb.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="feedback-list-container">
      <h1>Feedback List</h1>

      <div className="action-bar">
        <Link to="/add-feedback" className="add-btn">Add Feedback</Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Feedback Details"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <table className="feedback-table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>User ID</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map(fb => (
            <tr key={fb._id}>
              <td>{fb.feedbackId}</td>
              <td>{fb.userId}</td>
              <td>{fb.description}</td>
              <td>{fb.rating}/5</td>
              <td>
                <span className={`status-badge ${fb.status.toLowerCase()}`}>
                  {fb.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <Link to={`/edit-feedback/${fb._id}`} className="edit-btn">Edit</Link>
                  <button onClick={() => handleDelete(fb._id)} className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="download-section">
        <button className="download-btn" onClick={generatePDFReport}>Download Report</button>
      </div>
    </div>
  );
};

export default FeedbackList; 