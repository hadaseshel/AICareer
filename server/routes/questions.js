const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Question = require('../models/Question.js');
const router = express.Router();

// get the number of questions in the Questionnaire in the DB
router.get('/count', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
      const count = await Question.countDocuments({});
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // get questions from DB
  router.get('/', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
      const questions = await Question.find().sort( { "$natural": 1 } );
      if (questions) {
        res.json(questions);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // get question by id from DB
  router.get('/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const questionId = req.params.id;
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(question);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  // update data of questions by id
  router.put('/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const questionId = req.params.id;
    const { name, description } = req.body;
  
    try {
      const result = await Question.findByIdAndUpdate(questionId, { name, description }, { new: true });
      if (!result) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // creat a new question
  router.post('/', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { name, description } = req.body;
    try {
      const question = new Question({ name, description });
      const result = await question.save();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// delete a question
router.delete('/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const questionId = req.params.id;
    try {
      const result = await Question.findByIdAndDelete(questionId);
      if (!result) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json({ message: 'Question deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});


  module.exports = router;