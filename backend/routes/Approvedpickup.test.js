const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Approvedpickup = require('../models/Approvedpickup');
const approvedRoute = require('./Approvedpickup');

jest.mock('../models/Approvedpickup'); // Mock the model

const app = express();
app.use(express.json()); // To parse JSON body
app.use('/', approvedRoute); // Use the route we are testing

describe('GET /getapproved/:userID', () => {
  it('should return approved pickups for a specific user', async () => {
    // Mock data to return
    const mockApprovedPickups = [
      {
        collectorid: 123,
        userid: 1,
        date: '2023-10-17',
        time: '10:00 AM',
        location: 'Park Avenue',
        status: 'Approved',
        truckid: 100,
        collector: 'John Doe',
      },
    ];

    // Mock the find function to return the mock data
    Approvedpickup.find.mockResolvedValue(mockApprovedPickups);

    // Simulate a GET request
    const response = await request(app).get('/getapproved/123');

    // Test the status code and response
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockApprovedPickups);
  });

  it('should return 500 if there is an error in the database query', async () => {
    // Mock the find function to throw an error
    Approvedpickup.find.mockRejectedValue(new Error('Database error'));

    // Simulate a GET request
    const response = await request(app).get('/getapproved/123');

    // Test the status code and error message
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe('Error: Error: Database error');
  });
});
