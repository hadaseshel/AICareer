const mongoose = require('mongoose');
const {Schema} = mongoose;

const ResultSchema = new Schema({
    user_id: {type:String, unique:true},
    results: [{
      type: String
    }],
});

const ResultModel = mongoose.model('Result', ResultSchema);

module.exports = ResultModel;