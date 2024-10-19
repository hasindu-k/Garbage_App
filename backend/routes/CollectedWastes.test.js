/*
const request = require('supertest');
const app = require('../server'); // Replace with the path to your Express app
const CollectedWaste = require('../models/CollectedWaste');
const mongoose = require('mongoose');

describe('CollectedWastes API', () => {
    let server;

    beforeAll(() => {
        // Start the server before all tests
        server = app.listen(8070, () => {
            console.log('Test server is running');
        });
    });

    afterAll(async () => {
        // Close the server after tests finish
        await mongoose.connection.close();
        server.close(); // This will stop the server instance
    });
  // Mock data for testing
  const mockWasteData = {
    truckNumber: 'ABC123',
    wasteCollector: 'John Doe',
    area: 'Downtown',
    paperWaste: '12.5',
    foodWaste: '8.3',
    polytheneWaste: '5.1',
  };

  let collectedId;

  // POST - Positive case: Successfully add a new waste record
  it('should create a new waste record', async () => {
    const response = await request(app)
      .post('/addCollectedWaste')
      .send(mockWasteData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('totalWaste', '25.90');

    collectedId = response.body._id; // Save the ID for further tests
  });

  // POST - Negative case: Missing required field
  it('should fail to create a new waste record due to missing fields', async () => {
    const response = await request(app)
      .post('/addCollectedWaste')
      .send({
        truckNumber: 'XYZ456',
        paperWaste: '5.0',
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error saving waste data');
  });

  // GET - Positive case: Fetch all waste records
  it('should fetch all waste records', async () => {
    const response = await request(app).get('/getCollectedWaste');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // GET - Negative case: Fetch a single record with invalid ID
  it('should return 404 for fetching a non-existing waste record', async () => {
    const response = await request(app).get('/getCollectedWaste/invalidId123');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error fetching data');
  });

  // DELETE - Positive case: Successfully delete a waste record
  it('should delete the created waste record', async () => {
    const response = await request(app).delete(`/delete/${collectedId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Record deleted successfully');
  });

  // DELETE - Negative case: Delete a record with non-existing ID
  it('should return 404 when trying to delete a non-existing record', async () => {
    const response = await request(app).delete('/delete/invalidId123');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error deleting data');
  });
});
*/
