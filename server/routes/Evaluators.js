const express= require("express") ;
const Evaluator = require('../models/Evaluator');
require('dotenv').config();

const EvaluatorSchema = require('../utils/types').EvaluatorSchema;
const OpenAI = require("openai");
const aiPrompt = require("../utils/utils.js");
const Valuation = require("../models/Evaluation.js");
const e = require("express");


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

// GET route to fetch  evaluator
router.get('/evaluator/:evaluatorId', async (req, res) => {
    try {
        const { evaluatorId } = req.params;
        const evaluator = await Evaluator.find({ _id: evaluatorId });
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
        console.log("answer"+answerSheet)

        const openai = new OpenAI({
            apiKey:process.env.OPENAI_API_KEY1,
        });

        const completion = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
        {
          role: "user",
          content: [
            { type: "text", text: String(aiPrompt.prompt) },
            {
              type: "image_url",
              image_url: {
                "url":evaluator.questionPaper,
              },
            },
            {
              type: "image_url",
              image_url: {
                "url": evaluator.answerKey,
              },
            },
            {
                type: "image_url",
                image_url: {
                  "url":String(answerSheet),
                },
              },
            
           
          ],
        },
        
      ],
});

        
        // Assuming the API returns data as stringified JSON in the message content
        
        const valuationData = completion.choices[0].message.content
        const jsonString = valuationData.substring(7, valuationData.length - 3);
        
        console.log("Valuation Data:", jsonString); // Print the output to the console
        const valuationDataString = JSON.stringify(valuationData);

        const newValuation = new Valuation({
            evaluatorId,
            data: JSON.parse(jsonString),
            answerSheet
        });

        await newValuation.save();
        res.json({ message: "Success", data: valuationData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    
}
});

// GET endpoint to fetch evaluation data by ID
router.get('/review/:id', async (req, res) => {
    
    try {
        const evaluation = await Valuation.find({ evaluatorId: req.params.id });
        
        if (evaluation.length === 0) {
            return res.status(404).json({ message: 'No evaluations found for this evaluator' });
          }
        res.json(evaluation); // This is already in JSON format
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
  });
    router.delete('/review/:studentId', async (req, res) => {
    try {
      const result = await Valuation.deleteOne({ _id: req.params.studentId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Evaluation not found' });
      }
      res.status(204).send(); // No content to send back
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/update-score', async (req, res) => {
    const { evaluatorId, roll_no, question_no, newScore } = req.body;
    

    try {
        const result = await Valuation.findOneAndUpdate(
            {
                "evaluatorId": evaluatorId,             // Match by evaluatorId at the top level
                "data.roll_no": roll_no,                 // Match roll_no inside data object
                "data.answers.question_no": question_no  // Match question_no inside answers array which is nested in data
            },
            {
                "$set": { "data.answers.$.score.0": newScore } // Update the first score element for the matched question
            },
            { new: true } // Return the updated document
        );
        
        

        if (!result) {
            return res.status(404).send("evaluation not found");
        }
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
  


module.exports = router;

