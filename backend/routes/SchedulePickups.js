const router = require("express").Router();
let SchedulePickup = require("../models/SchedulePickup"); // Import the correct model

// Route to add a new pickup
router.route("/addPickup").post((req, res) => {
    const { date, time, location, userID } = req.body;

    const newPickup = new SchedulePickup({
        date,
        time,
        location,
        userID
    });

    newPickup.save()
        .then(() => {
            res.json("Pickup Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error: " + err);
        });
});

// Route to get all pickups
router.route("/getPickups").get((req, res) => {
    SchedulePickup.find()
        .then((schedulePickups) => {
            res.json(schedulePickups);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error: " + err);
        });
});

// Route to get a single pickup by ID
router.route("/getOnePickup/:id").get(async (req, res) => {
    let pickupId = req.params.id;

    try {
        const schedulePickup = await SchedulePickup.findById(pickupId);
        if (!schedulePickup) {
            return res.status(404).send({ status: "Pickup not found" });
        }
        res.status(200).send({ status: "Pickup fetched", schedulePickup });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with fetching pickup", error: err });
    }
});

module.exports = router;
