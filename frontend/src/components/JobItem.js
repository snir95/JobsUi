import React from 'react';

const JobItem = ({ job, onClick }) => {
  return (
    <li onClick={onClick}>
      {job.command} - {job.status}
    </li>
  );
};

export default JobItem;
