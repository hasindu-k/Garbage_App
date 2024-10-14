// RecycleForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RecycleForm from './RecycleForm';

const mockAxios = new MockAdapter(axios);

describe('RecycleForm Component', () => {
  beforeEach(() => {
    // Mock the API responses before each test
    mockAxios.onGet("http://localhost:8070/vehicle/allVehicles").reply(200, [
      { truckNo: 'Truck 1' },
      { truckNo: 'Truck 2' },
    ]);

    mockAxios.onGet("http://localhost:8070/approvedpickup/getapproved").reply(200, [
      { location: 'Area 1' },
      { location: 'Area 2' },
    ]);
  });

  test('renders form elements correctly', () => {
    render(<RecycleForm />);

    // Check if truck number dropdown is rendered
    expect(screen.getByLabelText(/Truck Number/i)).toBeInTheDocument();
    // Check if area dropdown is rendered
    expect(screen.getByLabelText(/Area/i)).toBeInTheDocument();
    // Check if paper weight input is rendered
    expect(screen.getByPlaceholderText(/Enter paper weight/i)).toBeInTheDocument();
  });

  test('calculates total waste and charge correctly', async () => {
    render(<RecycleForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText(/Enter paper weight/i), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter food weight/i), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter polythene weight/i), { target: { value: '2' } });

    // Wait for the calculated values to update
    await waitFor(() => {
      expect(screen.getByDisplayValue(/Total waste/i)).toHaveValue('17.00');
      expect(screen.getByDisplayValue(/Calculated charge/i)).toHaveValue('47.50');
    });
  });

  test('shows alert on submission failure', async () => {
    // Mock the post request to return an error
    mockAxios.onPost('http://localhost:8070/recycleWaste/addRecyclingWastes').reply(500);

    render(<RecycleForm />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Enter paper weight/i), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter food weight/i), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter polythene weight/i), { target: { value: '2' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Check for alert
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to submit data.');
    });
  });

  afterEach(() => {
    // Reset the alert mock after each test
    window.alert = jest.fn();
  });
});
