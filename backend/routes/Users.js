const router = require("express").Router();
let User = require("../models/User");

router.route("/add").post((req,res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const contact = Number(req.body.contact);

    const newUser = new User({
        name,
        address,
        email,
        contact
    })

    newUser.save().then(() => {
        res.json("User Added");
    }).catch((err) =>{
        console.log(err);
    })
    

    //get all users

    router.route("/").get((req,res) => {
        User.find().then((users) => {
            res.json(students);
        }).catch((err)=> {
            console.log(err);
        })
    })


    //get 1 user data

    router.route("/get/:id").get(async( req,res) => {
        let userId = req.params.id;
        const user = await User.findById(userId).then(() =>{
            res.status(200).send({status: "user fetched", user: user});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with get user", error: err});
        })
    })
})

module.exports = router;