import mongoose from "mongoose";

const EvaluationSchema = new mongoose.Schema({
  evaluatorId: {
    type: String,
    required: true
  },
  data: [{
    name: String,
    url: String,
  }],
  answerSheet: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const Evaluation = mongoose.model("Evaluation", EvaluationSchema);

export default Evaluation;
