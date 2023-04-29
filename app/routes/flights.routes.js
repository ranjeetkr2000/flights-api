const express = require('express');
const router = express.Router();

const flights = require("../controllers/flights.controller.js");

router.post("/", flights.create);

router.get("/", flights.findAll);

router.get("/:id", flights.findOne);

router.put("/:id", flights.update);

router.delete("/:id", flights.delete);

router.delete("/", flights.deleteAll);

module.exports = router;