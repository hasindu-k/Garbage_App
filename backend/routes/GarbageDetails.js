const express = require('express');
const router = express.Router();
const garbage = require('../models/GarbageDetail'); // Import the GarbageDetail model
const approvedPickup = require('../models/Approvedpickup'); // Import the ApprovedPickup model

// Route to get completed garbage details
router.get('/completed-garbage', async (req, res) => {
    try {
        // Fetch approved pickups with 'Completed' status
        const completedPickups = await approvedPickup.find({ status: 'Completed' });

        // Extract user IDs from completed pickups
        const userIds = completedPickups.map(pickup => pickup.userid);

        // Fetch garbage details for these user IDs
        const garbageDetails = await garbage.find({ userid: { $in: userIds } });

        // Send garbage details back as response
        res.json(garbageDetails);
    } catch (error) {
        console.error('Error fetching completed garbage details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
