const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const Occupation = require('../models/Occupation.js');

  // get the number of Occupations in the DB
  router.get('/count', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
      const count = await Occupation.countDocuments({});
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // get the Occupation data by it name
  router.get('/', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {Description} =  req.query;
    try {
        console.log(Description)
        const data = await Occupation.findOne({Description});
        console.log(data)
        res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  module.exports = router;