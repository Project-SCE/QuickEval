const mongoose = require("mongoose") ;

const EvaluatorSchema = new mongoose.Schema(
    {    
        educatorId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        questionPaper: {
            type: String,
            required: true
        },
        answerKey: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Evaluator = mongoose.model("Evaluator", EvaluatorSchema);

module.exports = Evaluator;