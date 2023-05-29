const mongoose = require('mongoose');
const {Schema} = mongoose;

const DatasetResponseSchema = new Schema({
  R1: Number, R2: Number, R3: Number, R4: Number, R5: Number, R6: Number, R7: Number, R8: Number,
  I1: Number, I2: Number, I3: Number, I4: Number, I5: Number, I6: Number, I7: Number, I8: Number,
  A1: Number, A2: Number, A3: Number, A4: Number, A5: Number, A6: Number, A7: Number, A8: Number,
  S1: Number, S2: Number, S3: Number, S4: Number, S5: Number, S6: Number, S7: Number, S8: Number,
  E1: Number, E2: Number, E3: Number, E4: Number, E5: Number, E6: Number, E7: Number, E8: Number,
  C1: Number, C2: Number, C3: Number, C4: Number, C5: Number, C6: Number, C7: Number, C8: Number,
  education: Number,
  urban: Number,
  gender: Number,
  engnat: Number,
  age: Number,
  hand: Number,
  religion: Number,
  orientation: Number,
  race: Number,
  voted: Number,
  married: Number,
  familysize: Number,
  uniqueNetworkLocation: Number,
  country: String,
  source: Number,
  major: String,
  code: String,
  occupation: String,
  occupationcode: String,
}, { collection: 'Questionnaire Responses' });

const DatasetResponseModel = mongoose.model('DatasetResponse', DatasetResponseSchema);

module.exports = DatasetResponseModel;