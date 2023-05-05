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

  module.exports = router;