const mongoose = require('mongoose');
const {Schema} = mongoose;

const HomeSchema = new Schema({
  section: String,
  title: String,
  title1: String,
  text1: String,
  title2: String,
  text2: String,
  title3: String,
  text3: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;