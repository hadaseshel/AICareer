const express = require('express');
const mongoose = require('mongoose');
const Response = require('../models/Response.js');
const router = express.Router();

// response post request
router.post('/', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {user_id,user_answers} = req.body;
  
    try {
      const responseDoc = await Response.create({
        user_id,
        user_answers
      });
      res.json(responseDoc);
    } catch (e) {
      console.log(e)
      res.status(422).json(e);
    }
  });


// get response by user id
router.get('/', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {user_id} = req.query;
    try {
      const responseDoc = await Response.findOne({user_id});
      res.json(responseDoc);
    }  catch (e) {
      console.log(e)
      res.status(422).json(e);
    }
});


module.exports = router;