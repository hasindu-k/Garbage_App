
const express = require('express');
const router = express.Router();
const garbage = require('../models/GarbageDetail'); // Import the GarbageDetail model
const approvedPickup = require('../models/Approvedpickup'); // Import the ApprovedPickup model

// Route to get completed garbage details
router.get('/completed-garbage'), async (req, res) => {
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
}

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
