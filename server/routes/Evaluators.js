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
        await Evaluator1.save((err, evaluator) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).json(evaluator);
                // Broadcast new evaluator to all connected WebSocket clients
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(evaluator));
                    }
                });
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to fetch all evaluators
router.get('/evaluators/:educatorId', async (req, res) => {
    try {
        const { educatorId } = req.params;
        const evaluator = await Evaluator.findOne({ educatorId: educatorId });
        if (!evaluator) {
            return res.status(404).json({ message: "Evaluator not found" });
        }
        res.status(200).json(evaluator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// PUT route to update an evaluator
router.put('/evaluators/:id', async (req, res) => {
    const { id } = req.params;
    const { educatorId, title, questionPaper, answerKey } = req.body;
    try {
        const updatedEvaluator = await Evaluator.findByIdAndUpdate(id, { educatorId, title, questionPaper, answerKey }, { new: true });
        res.status(200).json(updatedEvaluator);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); 

// DELETE route to delete an evaluator
router.delete('/evaluators/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Evaluator.findByIdAndDelete(id);
        res.status(200).json({ message: 'Evaluator deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;