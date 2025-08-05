const express = require("express");
const routes = express.Router();

// Import order controller
const { createOrder, getOrders, updateOrder, deleteOrder } = require("../controller/dordercontrollers");

// Define routes
routes.post("/", createOrder);
routes.get("/", getOrders);
routes.put("/:id", updateOrder);
routes.delete("/:id", deleteOrder);

module.exports = routes;