const mongoose = require('mongoose');
const {Schema} = mongoose;

const ResponseSchema = new Schema({
  user_id: String,
  user_answers: [{
    type: Number
  }],
});

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;