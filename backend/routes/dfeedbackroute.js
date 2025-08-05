const express = require("express");
const routes = express.Router();
const feedbackController = require("../controller/dfeedbackcontrollers");

// Feedback routes
routes.get("/", feedbackController.getFeedbacks);
routes.post("/add", feedbackController.createFeedback);
routes.get("/get/:id", feedbackController.getFeedbackById);
routes.put("/update/:id", feedbackController.updateFeedback);
routes.delete("/delete/:id", feedbackController.deleteFeedback);

module.exports = routes; 