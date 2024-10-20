const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Approvedpickup = require('../models/Approvedpickup');

describe('POST /approvedpickup/add', () => {
  // Clean up the test database after each test
  afterEach(async () => {
    await Approvedpickup.deleteMany({});
  });

  // Close the database connection after all tests are done
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should add a new approved pickup', async () => {
    const pickupData = {
      userid: 100,
      collectorid: 122,
      date: '2024-10-15',
      time: '10:00 AM',
      location: '123 Main St',
      truckid: 30,
    };

    const response = await request(app)
      .post('/approvedpickup/add') // Assuming your route starts with /approvedpickup
      .send(pickupData);

    // Expect the response to be 200 OK and contain the correct message
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Approved pickup added!');

    // Ensure that the pickup was saved in the database
    const savedPickup = await Approvedpickup.findOne({ userid: '100' });
    expect(savedPickup).not.toBeNull();
    expect(savedPickup.userid).toBe(pickupData.userid);
    expect(savedPickup.collectorid).toBe(pickupData.collectorid);
    expect(savedPickup.location).toBe(pickupData.location);
  });

  it('should return 400 if there is an error', async () => {
    const invalidPickupData = {
      collectorid: 'collector456', // Missing required fields like 'userid'
      date: '2024-10-15',
    };

    const response = await request(app)
      .post('/approvedpickup/add')
      .send(invalidPickupData);

    // Expect an error response
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('Error');
  });
});
