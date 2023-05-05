const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Occupation = require('./models/Occupation.js');
const Question = require('./models/Question.js');
const Home = require('./models/Home.js');
const HomeRouter = require('./routes/home.js');
const cookieParser = require('cookie-parser');

require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'kasefrac4r5r3wq45wdfgw34twrfx';

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }));

mongoose.connect(process.env.MONGO_URL);

// route the home 
app.use('/api/home',HomeRouter)

app.get('/test', (req, res) => {
    res.json('test ok');
});

// register post request
app.post('/api/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password,type} = req.body;
  
    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
        type
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
});

// login post request
app.post('/api/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
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
      res.json('not found');
    }
});

// get user profile request
app.get('/api/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,type,_id,} = await User.findById(userData.id);
        res.json({name,email,type,_id});
      });
    } else {
      res.json(null);
    }
});

// logout request
app.post('/api/logout', (req,res) => {
    res.cookie('token', '').json(true);
});
  
// get the number of users in the DB
app.get('/api/users', async (req, res) => {
  try {
    const count = await User.countDocuments({});
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get the number of Occupations in the DB
app.get('/api/occupations', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const count = await Occupation.countDocuments({});
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get the number of questions in the Questionnaire in the DB
app.get('/api/questionnaire', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const count = await Question.countDocuments({});
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get question from DB
app.get('/api/questions', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const questions = await Question.find();
    if (questions) {
      res.json(questions);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(4000);