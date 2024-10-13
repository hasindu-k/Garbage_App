const router = require("express").Router();
let Approvedpickup = require("../models/Approvedpickup");

// Route to get approved pickups
router.route("/getapproved").get((req, res) => {
    Approvedpickup.find()
        .then((Approvedpickup) => {
            res.json(Approvedpickup);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error: " + err);
        });
});

// Route to update the status of a pickup
// Route to update the status of a pickup
router.route("/update/:id").post((req, res) => {
    const pickupId = req.params.id;
    const { status } = req.body; // Use 'status'

    // Find the pickup by id and update the status
    Approvedpickup.findByIdAndUpdate(pickupId, { status: status }, { new: true })
        .then((updatedPickup) => {
            console.log('Updated pickup:', updatedPickup); // Log the updated document
            res.json(updatedPickup);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error updating pickup: " + err);
        });
});


module.exports = router;
