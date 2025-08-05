import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddFeedback.css";

const EditFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    feedbackId: "",
    userId: "",
    description: "",
    rating: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/dfeedbacks/get/${id}`);
      setFeedback(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      alert("Failed to fetch feedback details");
    }
  };

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axios.put(`http://localhost:5000/api/dfeedbacks/update/${id}`, feedback);
      alert("Feedback updated successfully!");
      navigate("/feedback");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const apiErrors = {};
        err.response.data.errors.forEach((msg) => {
          if (msg.includes("Description")) apiErrors.description = msg;
          if (msg.includes("Rating")) apiErrors.rating = msg;
        });
        setErrors(apiErrors);
      } else {
        alert("Failed to update feedback. Please try again.");
      }
    }
  };

  return (
    <div className="feedback-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2>Edit Feedback</h2>

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
            value={feedback.userId}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
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

        <button type="submit" className="submit-btn">Update Feedback</button>
      </form>
    </div>
  );
};

export default EditFeedback; 