const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuestionSchema = new Schema({
  name: String,
  description: String,
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;