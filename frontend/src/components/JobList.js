import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobItem from './JobItem';
import JobDetails from './JobDetails';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <div>
      <ul>
        {jobs.map(job => (
          <JobItem key={job.id} job={job} onClick={() => handleJobClick(job)} />
        ))}
      </ul>
      {selectedJob && <JobDetails job={selectedJob} />}
    </div>
  );
};

export default JobList;
