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

// Route to get all approved pickups
router.route("/getApprovedPickups").get((req, res) => {
    Approvedpickup.find()
        .then((approvedPickups) => {
            res.json(approvedPickups);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching approved pickups: " + err);
        });
});

module.exports = router;