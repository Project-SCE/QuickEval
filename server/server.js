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
console.log(Evaluator);

async function connectDB() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
}




connectDB();



app.use("/", evaluatorRouter);
// app.post('/evaluators', async (req, res) => {
//     try {
//         console.log(req.body)
//         const { educatorId, title, questionPaper, answerKey } = req.body;
//         const Evaluator1 = new Evaluator({ educatorId, title, questionPaper, answerKey });
//         await Evaluator1.save();
//         res.status(201).json(Evaluator1);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });


const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log("Server is running on port 3000");
});

