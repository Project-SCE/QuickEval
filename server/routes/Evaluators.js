const express= require("express") ;
const Evaluator = require('../models/Evaluator');

const router = express.Router();

router.get("/", (req, res) => {
    res.send("server is running");
});
router.post('/evaluators', async (req, res) => {
    try {
        console.log(req.body)
        const { educatorId, title, questionPaper, answerKey } = req.body;
        const Evaluator1 = new Evaluator({ educatorId, title, questionPaper, answerKey });
        await Evaluator1.save();
        res.status(201).json(Evaluator1);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;