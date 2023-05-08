const mongoose = require('mongoose');
const {Schema} = mongoose;

const OccupationSchema = new Schema({
  Code: String,
  Description: String,
  InterestCode: String,
  JobZone: Number
});

const OccupationModel = mongoose.model('Occupation', OccupationSchema);

module.exports = OccupationModel;