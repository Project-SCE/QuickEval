const express = require("express");
const axios = require('axios');
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(cors());




const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log("Server is running on port 3000");
});

