// tests/CollectedWasteController.test.js
const request = require('supertest');
const express = require('express');
const CollectedWasteRoutes = require('../routes/CollectedWastes');
const CollectedWaste = require('../models/CollectedWaste');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/collected-waste', CollectedWasteRoutes);

// Mock Mongoose model methods for testing
jest.mock('../models/CollectedWaste');
jest.mock('../models/User');

describe('CollectedWasteController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /collected-waste/addCollectedWaste - Success', async () => {
    User.findOne.mockResolvedValue({ name: 'John Doe' });
    CollectedWaste.prototype.save.mockResolvedValue({
      _id: '1',
      truckNumber: '123',
      wasteCollector: 'John Doe',
      area: 'Downtown',
      paperWaste: '5',
      foodWaste: '3',
      polytheneWaste: '2',
      totalWaste: '10.00',
    });

    const response = await request(app)
      .post('/collected-waste/addCollectedWaste')
      .send({
        truckNumber: '123',
        wasteCollector: 'John Doe',
        area: 'Downtown',
        paperWaste: '5',
        foodWaste: '3',
        polytheneWaste: '2',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.totalWaste).toBe('10.00');
  });

  test('POST /collected-waste/addCollectedWaste - Fail (Invalid waste collector)', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/collected-waste/addCollectedWaste')
      .send({
        truckNumber: '123',
        wasteCollector: 'Unknown Collector',
        area: 'Downtown',
        paperWaste: '5',
        foodWaste: '3',
        polytheneWaste: '2',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid waste collector. No user found with the given name.');
  });

  test('GET /collected-waste/getCollectedWaste - Success', async () => {
    CollectedWaste.find.mockResolvedValue([
      {
        _id: '1',
        truckNumber: '123',
        wasteCollector: 'John Doe',
        area: 'Downtown',
        paperWaste: '5',
        foodWaste: '3',
        polytheneWaste: '2',
        totalWaste: '10.00',
      },
    ]);

    const response = await request(app).get('/collected-waste/getCollectedWaste');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('truckNumber', '123');
  });

  test('GET /collected-waste/:collectedId - Fail (Record not found)', async () => {
    CollectedWaste.findById.mockResolvedValue(null);

    const response = await request(app).get('/collected-waste/invalidId');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Record not found');
  });
});


// POST /collected-waste/addCollectedWaste - Success: Tests the successful addition of a collected waste record. It mocks a valid user and simulates a successful save operation.
// POST /collected-waste/addCollectedWaste - Fail (Invalid waste collector): Tests the failure case where the waste collector is not found in the database, leading to a 400 Bad Request response.
// GET /collected-waste/getCollectedWaste - Success: Tests fetching all collected waste records successfully. It expects a non-empty array in the response.
// GET /collected-waste/:collectedId - Fail (Record not found): Tests the case where a record with a given ID is not found, expecting a 404 Not Found response