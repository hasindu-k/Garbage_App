const router = require("express").Router();
let Approvedpickup = require("../models/Approvedpickup");

// Route to get approved pickups for a specific user
router.route("/getapproved/:userID").get((req, res) => {
    const userID = req.params.userID;

    // Find approved pickups for the logged-in user
    Approvedpickup.find({ collectorid : userID })
        .then((Approvedpickup) => {
            res.json(Approvedpickup);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error: " + err);
        });
});

// Route to update the status of a pickup
router.route("/update/:id").post((req, res) => {
    const pickupId = req.params.id;
    const { status } = req.body;

    // Find the pickup by id and update the status
    Approvedpickup.findByIdAndUpdate(pickupId, { status: status }, { new: true })
        .then((updatedPickup) => {
            console.log('Updated pickup:', updatedPickup);
            res.json(updatedPickup);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error updating pickup: " + err);
        });
});

// Allocate a collector to a pickup
router.route("/update/:id").post((req, res) => {
    const pickupId = req.params.id;
    const { collectorId } = req.body;

    // Find the pickup by id and update the collector
    Approvedpickup.findByIdAndUpdate(pickupId, { collector: collectorId }, { new: true })
        .then((updatedPickup) => {
            console.log('Updated pickup:', updatedPickup); // Log the updated document
            res.json(updatedPickup);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error allocating collector: " + err);
        });
});

module.exports = router;
