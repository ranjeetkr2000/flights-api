const express = require("express");
const cors = require("cors");

const flightsRouter = require("./app/routes/flights.routes");
const errorHandler = require("./app/middlewares/errorHandler");
const db = require("./app/models");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
    .sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Go to /flights to get all flights result" });
});

app.use("/flights", flightsRouter);

//Error Handler Middleware
app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
