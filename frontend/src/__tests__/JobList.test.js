import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobList from '../JobList';

test('renders job list and handles job click', async () => {
  const mockJobs = [
    { id: 1, command: 'python script1.py', status: 'Running' },
    { id: 2, command: 'node server.js', status: 'Succeeded' },
  ];

  // Mock the axios call
  jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: mockJobs })),
  }));

  render(<JobList />);

  // Check if job items are rendered
  expect(await screen.findByText('python script1.py - Running')).toBeInTheDocument();
  expect(screen.getByText('node server.js - Succeeded')).toBeInTheDocument();

  // Simulate clicking on a job item
  fireEvent.click(screen.getByText('python script1.py - Running'));

  // Check if job details are rendered after click
  expect(await screen.findByText('Job Details')).toBeInTheDocument();
  expect(screen.getByText('Status: Running')).toBeInTheDocument();
});
