const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'kasefrac4r5r3wq45wdfgw34twrfx';

// register post request
router.post('/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password,type,answered} = req.body;
  
    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
        type,
        answered
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
});

// login post request
router.post('/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    console.log(email);
    console.log(password);
    const userDoc = await User.findOne({email});
    console.log(userDoc);
    if (userDoc !== null) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.status(422).json('not found');
    }
});

// get user profile request
router.get('/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,type,answered,_id,} = await User.findById(userData.id);
        res.json({name,email,type,answered,_id});
      });
    } else {
      res.json(null);
    }
});

// logout request
router.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});
  
// get the number of users in the DB
router.get('/users', async (req, res) => {
  try {
    const count = await User.countDocuments({});
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/useranswered', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const {user_id} = req.body;
    await User.updateOne({ _id: user_id }, { $set: { answered: 1 } })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;