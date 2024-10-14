// WasteCollectedForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WasteCollectedForm from './WasteCollectedForm';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');

describe('WasteCollectedForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form elements correctly', () => {
    render(
      <MemoryRouter>
        <WasteCollectedForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Truck Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Waste Collector/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Area/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Paper Waste \(Kg\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Food Waste \(Kg\):/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Polythene Waste \(Kg\):/i)).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    render(
      <MemoryRouter>
        <WasteCollectedForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Truck Number/i), {
      target: { value: 'Truck123' },
    });
    expect(screen.getByLabelText(/Truck Number/i).value).toBe('Truck123');

    fireEvent.change(screen.getByLabelText(/Waste Collector/i), {
      target: { value: 'Collector A' },
    });
    expect(screen.getByLabelText(/Waste Collector/i).value).toBe('Collector A');
  });

  test('submits the form and calls the API', async () => {
    // Mock the API response for fetching data
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [{ name: 'Collector A', role: 'collector' }] })
    );
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [{ location: 'Location A' }] })
    );
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [{ truckNo: 'Truck123' }] })
    );
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <WasteCollectedForm />
      </MemoryRouter>
    );

    // Wait for the fetches to complete
    await waitFor(() => {
      expect(screen.getByLabelText(/Truck Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Waste Collector/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Truck Number/i), {
      target: { value: 'Truck123' },
    });
    fireEvent.change(screen.getByLabelText(/Waste Collector/i), {
      target: { value: 'Collector A' },
    });
    fireEvent.change(screen.getByLabelText(/Area/i), {
      target: { value: 'Location A' },
    });
    fireEvent.change(screen.getByLabelText(/Paper Waste \(Kg\):/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText(/Food Waste \(Kg\):/i), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText(/Polythene Waste \(Kg\):/i), {
      target: { value: '3' },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    // Assert that axios.post was called with the expected arguments
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8070/collectedwaste/addCollectedWaste',
        {
          truckNumber: 'Truck123',
          wasteCollector: 'Collector A',
          area: 'Location A',
          paperWaste: '10',
          foodWaste: '5',
          polytheneWaste: '3',
          totalWaste: '18.00',
        }
      );
      // Check if the form is reset after submission
      expect(screen.getByLabelText(/Truck Number/i).value).toBe('');
    });
  });

  test('shows error alert on API failure', async () => {
    // Mock the API response for fetching data
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [{ name: 'Collector A', role: 'collector' }] })
    );
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [{ location: 'Location A' }] })
    );
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [{ truckNo: 'Truck123' }] })
    );
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter>
        <WasteCollectedForm />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Truck Number/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Truck Number/i), {
      target: { value: 'Truck123' },
    });
    fireEvent.change(screen.getByLabelText(/Waste Collector/i), {
      target: { value: 'Collector A' },
    });
    fireEvent.change(screen.getByLabelText(/Area/i), {
      target: { value: 'Location A' },
    });
    fireEvent.change(screen.getByLabelText(/Paper Waste \(Kg\):/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText(/Food Waste \(Kg\):/i), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText(/Polythene Waste \(Kg\):/i), {
      target: { value: '3' },
    });

    window.alert = jest.fn(); // Mock alert

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error submitting data');
    });
  });
});
