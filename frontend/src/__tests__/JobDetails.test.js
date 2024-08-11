import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobDetails from '../JobDetails';

test('renders job details', () => {
  const job = {
    status: 'Running',
    user: 'john_doe',
    group: 'developers',
    dateSubmitted: '2023-08-12',
    dateCompleted: null,
    command: 'python script1.py',
    logData: 'Job started...',
  };

  render(<JobDetails job={job} />);

  // Check if job details are rendered
  expect(screen.getByText('Job Details')).toBeInTheDocument();
  expect(screen.getByText('Status: Running')).toBeInTheDocument();
  expect(screen.getByText('User: john_doe')).toBeInTheDocument();
  expect(screen.getByText('Group: developers')).toBeInTheDocument();
  expect(screen.getByText('Command: python script1.py')).toBeInTheDocument();
  expect(screen.getByText('Job started...')).toBeInTheDocument();
});
