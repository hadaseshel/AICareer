const mongoose = require('mongoose');
const {Schema} = mongoose;

const ResponseSchema = new Schema({
  user_id: {type:String, unique:true},
  answers: [Number],
});

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;