const mongoose = require('mongoose');
const {Schema} = mongoose;

const OccupationSchema = new Schema({
  Code: String,
  Description: String,
  InterestCode: String,
  JobZone: Number,
  Knowledge: [{
    Importance: Number,
    Knowledge: String,
    Knowledge_Description: String
  }],
  Skills: [{
    Importance: Number,
    Skill: String,
    Skill_Description: String
  }],
  Tasks: [{
    Importance: Number,
    Category: String,
    Task: String
  }],
  Work_Activities: [{
    Importance: Number,
    Work_Activity: String,
    Work_Activity_Description: String
  }]
});

const OccupationModel = mongoose.model('Occupation', OccupationSchema);

module.exports = OccupationModel;