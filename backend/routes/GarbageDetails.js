
const express = require('express');
const router = express.Router();
const garbage = require('../models/GarbageDetail'); // Import the GarbageDetail model
const approvedPickup = require('../models/Approvedpickup'); // Import the ApprovedPickup model

// Route to get completed garbage details
router.get('/completed-garbage', async (req, res) => {
    const collectorId = req.query.userId; // Get the collector's userId from the cookies

    try {
        // Fetch approved pickups with 'Completed' status where the collectorid matches the current user
        const completedPickups = await approvedPickup.find({ status: 'Completed', collectorid: collectorId });

        if (!completedPickups.length) {
            return res.status(404).json({ message: 'No completed pickups found for this user.' });
        }

        // Get the userid from the completed pickups
        const userIds = completedPickups.map(pickup => pickup.userid);

        // Fetch garbage details for those specific user ids
        const garbageDetails = await garbage.find({ userID: { $in: userIds } });

        res.json(garbageDetails);
        
    } catch (error) {
        console.error('Error fetching completed garbage details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
 // Fixed syntax issue

router.route("/addGarbage").post((req, res) => {
    const date = req.body.date;
    const category = req.body.category;
    const weight = Number(req.body.weight);
    const payment = Number(req.body.payment);  // Change from Double to Number

    const newGarbage = new garbage({
        date,
        category,
        weight,
        payment
    });

    newGarbage.save()
        .then(() => {
            res.json("Garbage Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get all garbages
router.route("/getAllGarbage").get((req, res) => {
    garbage.find()
        .then((garbages) => {
            res.json(garbages);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get one garbage data
router.route("/getOneGarbage/:id").get(async (req, res) => {
    let garbageId = req.params.id;
    const garbage = await garbage.findById(garbageId)
        .then(() => {
            res.status(200).send({ status: "garbage fetched", garbage: garbage });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with get garbage", error: err });
        });

});

module.exports = router;
