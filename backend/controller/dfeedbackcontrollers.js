const Feedback = require("../models/dfeedbackmodel");

// Get All Feedbacks
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks", error: err.message });
  }
};

// Get Feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedback", error: err.message });
  }
};

// Create Feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    if (err.name === "ValidationError") {
      // Collect all validation error messages
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Update Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { feedbackId, userId, description, rating, status } = req.body;

    // Validate required fields
    if (!description || !rating || !status) {
      return res.status(400).json({ message: "Description, rating, and status are required" });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { feedbackId, userId, description, rating, status },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to update feedback", error: err.message });
  }
};

// Delete Feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete feedback", error: err.message });
  }
}; 