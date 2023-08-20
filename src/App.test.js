import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; // Import axios to mock it

import ExpenseForm from './ExpenseForm';

// Mock axios for testing
jest.mock('axios');

describe('ExpenseForm', () => {
  test('displays success alert after successful form submission', async () => {
    // Mock the successful axios post call
    axios.post.mockResolvedValueOnce({});

    render(<ExpenseForm />);

    // Fill in form fields and submit
    const amountInput = screen.getByLabelText('Money Spent');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getByLabelText('Category');
    const addButton = screen.getByRole('button', { name: /add expense/i });

    userEvent.type(amountInput, '100');
    userEvent.type(descriptionInput, 'Sample Expense');
    userEvent.type(categoryInput, 'Food');
    userEvent.click(addButton);

    // Wait for the success alert to appear
    const successAlert = await screen.findByText(/expense added successfully/i);
    expect(successAlert).toBeInTheDocument();
  });

  test('displays error alert after failed form submission', async () => {
    // Mock the axios post call to simulate an error
    axios.post.mockRejectedValueOnce(new Error('Mock error'));

    render(<ExpenseForm />);

    // Fill in form fields and submit
    const amountInput = screen.getByLabelText('Money Spent');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getByLabelText('Category');
    const addButton = screen.getByRole('button', { name: /add expense/i });

    userEvent.type(amountInput, '100');
    userEvent.type(descriptionInput, 'Sample Expense');
    userEvent.type(categoryInput, 'Food');
    userEvent.click(addButton);

    // Wait for the error alert to appear
    const errorAlert = await screen.findByText(/an error occurred/i);
    expect(errorAlert).toBeInTheDocument();
  });
});
