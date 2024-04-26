const express= require("express") ;
const Evaluator = require('../models/Evaluator');
const e = require("express");
const EvaluatorSchema = require('../utils/types').EvaluatorSchema;

const router = express.Router();

const validatePayload = (payload) => {
    const parsedPayload = EvaluatorSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return {
            success: false,
            error: "You sent the wrong inputs",
        };
    }

    return {
        success: true,
        data: parsedPayload.data,
    };
};

router.get("/", (req, res) => {
    res.send("server is running");
});
router.post('/evaluators', async (req, res) => {
    try {
        const createPayload = req.body;
        const validationResult = validatePayload(createPayload);

    if (!validationResult.success) {
    res.status(411).json({
        msg: validationResult.error,
    });
    return;
    
}       const validData = validationResult.data;
        const { educatorId, title, questionPaper, answerKey } = validData;
        const Evaluator1 = new Evaluator({ educatorId, title, questionPaper, answerKey });
        await Evaluator1.save();
        res.status(201).json(Evaluator1);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to fetch all evaluators
router.get('/evaluators/:educatorId', async (req, res) => {
    try {
        const { educatorId } = req.params;
        const evaluator = await Evaluator.find({ educatorId: educatorId });
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
    const createPayload = req.body;
    const validationResult = validatePayload(createPayload);

    if (!validationResult.success) {
    res.status(411).json({
        msg: validationResult.error,
    });
    return;
    
    }       
    const validData = validationResult.data;
    const { educatorId, title, questionPaper, answerKey } = validData;
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

router.post('/evaluators/evaluate', async (req, res) => {
    
    const { evaluatorId,answerSheet } = req.body;
    console.log(evaluatorId);
    res.json({ message: "Success", data: { evaluatorId: evaluatorId, answerSheet: answerSheet } });

});


module.exports = router;

