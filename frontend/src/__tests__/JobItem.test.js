import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobItem from '../JobItem';

test('renders job item and handles click', () => {
  const job = { command: 'python script1.py', status: 'Running' };
  const handleClick = jest.fn();

  render(<JobItem job={job} onClick={handleClick} />);

  // Check if job item is rendered
  expect(screen.getByText('python script1.py - Running')).toBeInTheDocument();

  // Simulate click
  fireEvent.click(screen.getByText('python script1.py - Running'));

  // Check if click handler is called
  expect(handleClick).toHaveBeenCalledTimes(1);
});
