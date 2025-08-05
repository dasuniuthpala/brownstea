import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddFeedback.css";

const AddFeedback = () => {
  const [feedback, setFeedback] = useState({
    feedbackId: "",
    userId: "",
    description: "",
    rating: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const generatedId = `FB-${Date.now().toString().slice(-6)}`;
    setFeedback((prev) => ({ ...prev, feedbackId: generatedId }));
  }, []);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      await axios.post("http://localhost:5000/api/dfeedbacks/add", feedback);
      alert("Feedback added successfully!");
      navigate("/feedback");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const apiErrors = {};
        err.response.data.errors.forEach((msg) => {
          if (msg.includes("User ID")) apiErrors.userId = msg;
          if (msg.includes("Description")) apiErrors.description = msg;
          if (msg.includes("Rating")) apiErrors.rating = msg;
        });
        setErrors(apiErrors);
      } else {
        alert("Failed to add feedback. Please try again.");
      }
    }
  };

  return (
    <div className="feedback-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2>Add New Feedback</h2>

        <div className="form-group">
          <label>Feedback ID:</label>
          <input
            type="text"
            name="feedbackId"
            value={feedback.feedbackId}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            placeholder="Enter User ID"
            value={feedback.userId}
            onChange={handleChange}
            required
          />
          {errors.userId && <div className="error-message">{errors.userId}</div>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter Description"
            value={feedback.description}
            onChange={handleChange}
            required
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="Enter Rating (1-5)"
            value={feedback.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
          {errors.rating && <div className="error-message">{errors.rating}</div>}
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={feedback.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default AddFeedback; 