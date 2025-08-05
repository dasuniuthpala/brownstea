const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedbackId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Only allow alphanumeric characters (no symbols)
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: "User ID must not contain symbols or spaces.",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Description must be at least 10 characters"],
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Rating must be between 1 and 5"],
    max: [5, "Rating must be between 1 and 5"],
    validate: {
      validator: function (v) {
        // Must be a number (NaN check covers non-numeric like letters/symbols)
        return typeof v === "number" && !isNaN(v);
      },
      message: "Rating must be a numeric value.",
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Resolved"],
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
