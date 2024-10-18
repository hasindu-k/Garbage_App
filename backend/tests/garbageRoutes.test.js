const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const garbageRouter = require('../routes/garbageRoutes'); // Import the router
const GarbageDetail = require('../models/GarbageDetail'); // Import model for mocking
const ApprovedPickup = require('../models/Approvedpickup'); // Import model for mocking

// Create an express app instance for testing
const app = express();
app.use(express.json());
app.use('/', garbageRouter); // Use the garbage router

// Mock the Mongoose models
jest.mock('../models/GarbageDetail');
jest.mock('../models/ApprovedPickup');

describe('Garbage Routes', () => {
    // Test case 1: Test the /completed-garbage route
    it('should fetch completed garbage details', async () => {
        // Mock data
        const completedPickups = [
            { userid: 'user1' },
            { userid: 'user2' }
        ];
        const garbageDetails = [
            { userid: 'user1', category: 'Plastic', weight: 10 },
            { userid: 'user2', category: 'Organic', weight: 5 }
        ];

        // Mock the database queries
        ApprovedPickup.find.mockResolvedValue(completedPickups);
        GarbageDetail.find.mockResolvedValue(garbageDetails);

        const res = await request(app).get('/completed-garbage');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(garbageDetails);
    });

    // Test case 2: Test the /addGarbage POST route
    it('should add a new garbage entry', async () => {
        const newGarbage = {
            date: '2024-10-18',
            category: 'Plastic',
            weight: 10,
            userID: 123
        };

        // Mock the save function of the garbage model
        GarbageDetail.prototype.save = jest.fn().mockResolvedValue(newGarbage);

        const res = await request(app).post('/addGarbage').send(newGarbage);
        expect(res.status).toBe(200);
        expect(res.body).toBe('Garbage Added');
    });

    // Test case 3: Test the /getOneGarbage/:id route
    it('should fetch a single garbage entry by ID', async () => {
        const garbageId = 'mockId';
        const garbageEntry = { _id: garbageId, category: 'Plastic', weight: 10, userID: 123 };

        // Mock the findById function of the garbage model
        GarbageDetail.findById.mockResolvedValue(garbageEntry);

        const res = await request(app).get(`/getOneGarbage/${garbageId}`);
        expect(res.status).toBe(200);
        expect(res.body.garbage).toEqual(garbageEntry);
    });
});
