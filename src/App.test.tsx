import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page title', () => {
  render(<App />);
  const element = screen.getByText(/Options strategy risk & reward analysis/i);
  expect(element).toBeInTheDocument();
});
