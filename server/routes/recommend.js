const mongoose = require('mongoose');
const express = require('express');
const { spawn } = require('child_process');
const DatasetResponse = require('../models/DatasetResponse.js');
const path = require('path');
const router = express.Router();

router.use(express.json());

// Endpoint to trigger recommendation calculations
router.get('/', async (req, res) => {
    const {user_id, user_answers} = req.query;
    const mappedFields = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8',
                            'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8',
                            'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
                            'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8',
                            'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
                            'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'occupation']
    //let fields = ""
    //mappedFields.forEach((field) => {
    //    fields = fields + field + " "
    //});
    mongoose.connect(process.env.MONGO_URL);
    try {
        const documents = await DatasetResponse.find().limit(15000).select(mappedFields);
        if (documents) {
          //count = count + 1;

          // Process documents and create JSON object called responses (doc._id: {answers + proffesion})
          const responses = {};
          documents.forEach((document) => {
              const mappedFieldsData = {};
              mappedFields.forEach((field) => {
                  mappedFieldsData[field] = document[field];
              });
              responses[document._id] = mappedFieldsData;
          });
          
          // Pass the data to the Python script and get the recommended proffesions
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
  });
}

module.exports = router;