const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Home = require('../models/Home.js');
const cookieParser = require('cookie-parser');
const router = express.Router();

// get the section data by the string in section varbile
router.get('/', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {section} =  req.query;
    try {
        const sectionData = await Home.findOne({section});
        res.json(sectionData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Updating values of the section
  router.put('/', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {section,title,title1,text1,title2,text2,title3,text3} =  req.body;
    try {
      const result = await Home.updateOne( { section },
        { title, title1, text1, title2, text2, title3, text3 });
        res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;