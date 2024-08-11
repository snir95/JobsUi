const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const readJobs = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('jobs.json', 'utf8', (err, data) => {
      if (err) {
        reject('Error reading jobs file');
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeJobs = (jobs) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('jobs.json', JSON.stringify(jobs, null, 2), 'utf8', (err) => {
      if (err) {
        reject('Error writing jobs file');
      } else {
        resolve();
      }
    });
  });
};

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await readJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const updatedJob = req.body;

  try {
    const jobs = await readJobs();
    const jobIndex = jobs.findIndex(job => job.id === jobId);

    if (jobIndex === -1) {
      res.status(404).send('Job not found');
      return;
    }

    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
    await writeJobs(jobs);
    res.json(jobs[jobIndex]);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Only start the server if this file is run directly and not as a test
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app; // Export the app for testing
