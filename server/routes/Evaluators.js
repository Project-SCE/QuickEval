const express= require("express") ;
const Evaluator = require('../models/Evaluator');
const e = require("express");
const EvaluatorSchema = require('../utils/types').EvaluatorSchema;
const OpenAI = require("openai");
const aiPrompt = require("../utils/utils.js");
const Valuation = require("../models/Evaluation.js");

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
    try {
        const { evaluatorId, answerSheet } = req.body; // Ensure answerSheet is the URL of the uploaded image
        const evaluator = await Evaluator.findById(evaluatorId);

        if (!evaluator) {
            return res.status(404).json({ message: "Evaluator not found" });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: "Evaluate the answer sheet using the question paper and answer key provided."
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Question Paper:" },
                        { type: "image_url", image_url: evaluator.questionPaper }
                    ]
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Key:" },
                        { type: "image_url", image_url: evaluator.answerKey }
                    ]
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Sheet:" },
                        { type: "image_url", image_url: answerSheet }
                    ]
                }
            ]
        });

        // Assuming the API returns data as stringified JSON in the message content
        const valuationData = JSON.parse(completion.choices[0].message.content);

        console.log("Valuation Data:", valuationData); // Print the output to the console

        const newValuation = new Valuation({
            evaluatorId,
            data: valuationData,
            answerSheet
        });

        await newValuation.save();
        res.json({ message: "Success", data: valuationData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;

