const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')

app.use(express.json());

// route import
const product = require("./routes/productRoute");

app.use("/api/v1", product);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
