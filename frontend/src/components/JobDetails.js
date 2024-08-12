import React from 'react';
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobDetails = ({ job }) => {
  return (
    <div>
      <h2>Job Details</h2>
      <p>Status: {job.status}</p>
      <p>User: {job.user}</p>
      <p>Group: {job.group}</p>
      <p>Date Submitted: {formatDate(job.dateSubmitted)}</p>
      <p>Date Completed: {job.dateCompleted ? formatDate(job.dateCompleted) : 'N/A'}</p>
      <p>Command: {job.command}</p>
      <pre>{job.logData}</pre>
    </div>
  );
};

export default JobDetails;
