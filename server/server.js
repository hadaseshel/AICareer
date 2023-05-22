const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Occupation = require('./models/Occupation.js');
const Question = require('./models/Question.js');
const Home = require('./models/Home.js');
const Response = require('./models/Response.js');
const HomeRouter = require('./routes/home.js');
const ResponseRouter = require('./routes/response.js');
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

// route the response 
app.use('/api/response',ResponseRouter)


app.get('/test', (req, res) => {
    res.json('test ok');
});

// register post request
app.post('/api/register', async (req,res) => {
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
        const {name,email,type,answered,_id,} = await User.findById(userData.id);
        res.json({name,email,type,answered,_id});
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

// get questions from DB
app.get('/api/questions', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const questions = await Question.find().sort( { "$natural": 1 } ).limit(4);
    if (questions) {
      res.json(questions);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// move to respone router
// response post request
// app.post('/api/response/write', async (req,res) => {
//   mongoose.connect(process.env.MONGO_URL);
//   const {name} =  req.query;
//   try {
//     const question = await Question.find({name});
//     res.json(question);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// get question by id from DB
app.get('/api/questions/:id', async (req, res) => {
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
app.put('/api/questions/:id', async (req, res) => {
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
app.post('/api/questions', async (req, res) => {
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
app.delete('/api/questions/:id', async (req, res) => {
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

app.listen(4000);