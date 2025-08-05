const express = require("express");
const routes = express.Router();

//insert model
const item = require("../models/itemmodel");
//insert item controller
const itemcontrollers = require("../controller/itemcontrollers");

routes.get("/", itemcontrollers.getAllitems);
routes.post("/", itemcontrollers.additems);
routes.get("/:id", itemcontrollers.getById);
routes.put("/:id", itemcontrollers.updateitem);
routes.delete("/:id", itemcontrollers.deleteitem);

//export
module.exports = routes;
