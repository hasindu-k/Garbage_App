// const request = require('supertest');
// const app = require('../server'); // Import your Express app
// const mongoose = require('mongoose');
// const SchedulePickup = require('../models/SchedulePickup'); // Import the SchedulePickup model

// describe('PUT /schedulePickup/updateStatus/:id', () => {
//   // Clean up the test database after each test
//   afterEach(async () => {
//     await SchedulePickup.deleteMany({});
//   });

//   // Close the database connection after all tests are done
//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it('should update the status of a pickup', async () => {
//     // First, create a pickup to update
//     const pickupData = {
//       id: 1,
//       date: '2024-10-15',
//       time: '10:00 AM',
//       location: '123 Main St',
//       userID: 100,
//       status: 'Pending', // Initial status
//     };

//     const pickup = await SchedulePickup.create(pickupData); // Create a pickup document in the database

//     const response = await request(app)
//       .put(`/schedulePickup/updateStatus/${pickup._id}`) // Send a PUT request with the pickup ID
//       .send({ status: 'Completed' }); // New status to update

//     // Expect the response to be 200 OK
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe('Pickup status updated');
//     expect(response.body.updatedPickup.status).toBe('Completed'); // Check if the status was updated

//     // Verify that the status was updated in the database
//     const updatedPickup = await SchedulePickup.findById(pickup._id);
//     expect(updatedPickup.status).toBe('Completed');
//   });

//   it('should return 404 if the pickup is not found', async () => {
//     const response = await request(app)
//       .put('/schedulePickup/updateStatus/60c72b2f9b1d5e3d58a0b2f2') // Non-existent ID
//       .send({ status: 'Completed' });

//     // Expect a 404 response
//     expect(response.statusCode).toBe(404);
//     expect(response.body.status).toBe('Pickup not found');
//   });

//   it('should return 500 if there is a server error', async () => {
//     // To simulate a server error, we'll mock the findByIdAndUpdate method
//     jest.spyOn(SchedulePickup, 'findByIdAndUpdate').mockImplementation(() => {
//       throw new Error('Server error');
//     });

//     const response = await request(app)
//       .put('/schedulePickup/updateStatus/60c72b2f9b1d5e3d58a0b2f2') // Using a random ID
//       .send({ status: 'Completed' });

//     // Expect a 500 response
//     expect(response.statusCode).toBe(500);
//     expect(response.body.status).toBe('Error with updating pickup status');
//   });
// });
