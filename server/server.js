const express = require("express");
const axios = require('axios');
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const evaluatorRouter = require("./routes/Evaluators");
const Evaluator = require('./models/Evaluator');

const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
}

connectDB();

app.use("/", evaluatorRouter);

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log("Server is running on port 3000");
});

