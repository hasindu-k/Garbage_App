const router = require("express").Router();
let garbage = require("../models/GarbageDetail");

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
