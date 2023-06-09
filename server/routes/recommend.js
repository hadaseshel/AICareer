const mongoose = require('mongoose');
const express = require('express');
const { spawn } = require('child_process');
const DatasetResponse = require('../models/DatasetResponse.js');
const Result = require('../models/Result.js');
const path = require('path');
const router = express.Router();

router.use(express.json());

// result gett request
router.get('/result', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {user_id} = req.query;
  try {
    const responseDoc = await Result.findOne({user_id});
    res.json(responseDoc);
  }  catch (e) {
    console.log(e)
    res.status(422).json(e);
  }
});


// result post request
router.post('/result', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {user_id,results} = req.body;
  try {
    const responseDoc = await Result.create({
      user_id,
      results
    });
    res.json(responseDoc);
  } catch (e) {
    console.log(e)
    res.status(422).json(e);
  }
});


// Endpoint to trigger recommendation calculations
router.get('/', async (req, res) => {
    const {user_id, user_answers} = req.query;

    var mappedFields = []

    mongoose.connect(process.env.MONGO_URL);

    // Get the fields we want to insert to the data we send to recommendation system
    try {
      console.log("TRY 1")
        const one_document = await DatasetResponse.findOne()
        const fields_to_filter = ["occupationcode", "_id"]
        mappedFields = Object.keys(one_document._doc)
        fields_to_filter.forEach((field) => {
          var index = mappedFields.indexOf(field);
          if (index !== -1) {
            mappedFields.splice(index, 1);
          }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }


    // Get the the data we send to recommendation system
    try {
      
      const documents = await DatasetResponse.find().limit(15000);
      if (documents) {

          // Process documents and create JSON object called responses (doc._id: {answers + proffesion})
          const responses = {};
          documents.forEach((document) => {
              const mappedFieldsData = {};
              mappedFields.forEach((field) => {
                  mappedFieldsData[field] = document[field];
              });
              responses[document._id] = mappedFieldsData;
          });
          
          //Pass the data to the Python script and get the recommended proffesions
          callPythonScript(responses, user_id, user_answers)
              .then((recommendations) => {
                  res.json({ recommendations });
              })
              .catch((err) => {
                  console.log(err);
                  res.status(500).json({ error: 'Internal server error' });
              });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Function to call the Python script
function callPythonScript(data, user_id, user_answers) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(__dirname, '../cf_model/cf_script.py');
    const pythonProcess = spawn('python', [scriptPath, user_id, JSON.stringify(user_answers)]);

    let recommendations = ''

    // Send data to the Python process
    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();

    // Handle errors when writing to the Python process
    pythonProcess.stdin.on('error', (err) => {
      console.error('Error writing to the Python process:', err);
      reject(err);
    });

    // Capture the output from the Python process
    pythonProcess.stdout.on('data', (data) => {
      recommendations += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    // Handle the completion of the Python process
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(recommendations));
      } else {
        reject('An error occurred during recommendation calculations');
      }
    });

    // Handle errors when the Python process exits with an error
    pythonProcess.on('error', (err) => {
      console.error('Python process error:', err);
      reject(err);
    });
  });
}

// option to try2
// var responses = {}
      // const cursor = DatasetResponse.find({}).lean().cursor();
      // //const responses = {};

      // let count = 0; // Counter for the fetched documents

      // cursor.on('data', (document) => {
      //   // Perform your desired action on each document
      //   const mappedFieldsData = {};
      //   mappedFields.forEach((field) => {
      //       mappedFieldsData[field] = document[field];
      //   });
      //   responses[document._id] = mappedFieldsData;

      //   count++;

      //   if (count >= limit) {
      //     cursor.close(); // Close the cursor if the limit is reached
      //   }
      // });

      // cursor.on('end', () => {
      //   callPythonScript(responses, user_id, user_answers)
      //         .then((recommendations) => {
      //             res.json({ recommendations });
      //         })
      //         .catch((err) => {
      //             console.log(err);
      //             res.status(500).json({ error: 'Internal server error' });
      //         });
      // });
      


module.exports = router;