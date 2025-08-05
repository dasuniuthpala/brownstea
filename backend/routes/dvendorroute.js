const express = require("express");
const routes = express.Router();

const item = require("../models/dvendormodel");

const dvendorControllers = require("../controller/dvendorcontrollers");

routes.get("/", dvendorControllers.getAllVendors);
routes.post("/", dvendorControllers.addVendor);
routes.get("/:id", dvendorControllers.getVendorById);
routes.put("/:id", dvendorControllers.updateVendor);
routes.delete("/:id", dvendorControllers.deleteVendor);

module.exports = routes;

