const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.use(express.json());

// Endpoint to trigger recommendation calculations
router.get('/', (req, res) => {
  // Retrieve data from MongoDB collection
  YourResponseModel.find({}, { responses: 1 })
    .then((data) => {
      const responses = data.map((item) => item.responses);
      // Pass the data to the Python script
      callPythonScript(responses)
        .then((recommendations) => {
          res.json({ recommendations });
        })
        .catch((error) => {
          console.error('Error calling Python script:', error);
          res.status(500).json({ error: 'An error occurred during recommendation calculations' });
        });
    })
    .catch((error) => {
      console.error('Error retrieving data from MongoDB:', error);
      res.status(500).json({ error: 'An error occurred during data retrieval' });
    });
});

// Function to call the Python script
function callPythonScript(data) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['path/to/your/python_script.py']);

    let recommendations = '';

    // Send data to the Python process
    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();

    // Capture the output from the Python process
    pythonProcess.stdout.on('data', (data) => {
      recommendations += data.toString();
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
