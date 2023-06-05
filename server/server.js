const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const HomeRouter = require('./routes/home.js');
const QuestionsRouter = require('./routes/questions.js');
const OccupationsRouter = require('./routes/occupations.js');
const ResponseRouter = require('./routes/response.js');
const RecommendRouter = require('./routes/recommend.js');
const UserRouter = require('./routes/user.js');
const cookieParser = require('cookie-parser');

require('dotenv').config()
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }));

mongoose.connect(process.env.MONGO_URL);

// route the occupations
app.use('/api/occupations',OccupationsRouter)

// route the questions
app.use('/api/questions',QuestionsRouter)

// route the home 
app.use('/api/home',HomeRouter)

// route the response 
app.use('/api/response',ResponseRouter)

// route the recommend 
app.use('/api/recommend',RecommendRouter)

// route the user 
app.use('/api/user',UserRouter)


app.listen(4000);