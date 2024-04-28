const z = require("zod");

const EvaluatorSchema = z.object({
    educatorId: z.string(),
    title: z.string(),
    questionPaper: z.string(),
    answerKey: z.string(),
});

module.exports = {
    EvaluatorSchema
}