import React from 'react';

const JobDetails = ({ job }) => {
  return (
    <div>
      <h2>Job Details</h2>
      <p>Status: {job.status}</p>
      <p>User: {job.user}</p>
      <p>Group: {job.group}</p>
      <p>Date Submitted: {job.dateSubmitted}</p>
      <p>Date Completed: {job.dateCompleted}</p>
      <p>Command: {job.command}</p>
      <pre>{job.logData}</pre>
    </div>
  );
};

export default JobDetails;
