const bcrypt = require("bcryptjs");
const router = require("express").Router();
let User = require("../models/User");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;
  const contact = Number(req.body.contact);

  const newUser = new User({
    name,
    address,
    email,
    contact,
  });

  newUser
    .save()
    .then(() => {
      res.json("User Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Not Registered, re-register" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      message: user.isAdmin ? "Admin Login successful" : "Login successful",
      userId: user.id,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logging in" });
  }
});

// User registration route with password hashing
router.post("/register", async (req, res) => {
  const { name, address, email, contact, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User object
    const newUser = new User({
      name,
      address,
      email,
      contact,
      password: hashedPassword, // Store the hashed password
      role: role,
    });

    // Save the user to the database
    await newUser.save();
    res.json("User Registered");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

//get all users
// router.route("/").get((req, res) => {
//   User.find()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


router.route("/").get((req, res) => {
  User.find()
    .then((users) => {
      // Categorize users by role
      const categorizedUsers = users.reduce((acc, user) => {
        const role = user.role || 'Guest'; // Default to 'Guest' if no role
        if (!acc[role]) {
          acc[role] = [];
        }
        acc[role].push(user);
        return acc;
      }, {});

      res.json(categorizedUsers);
    })
    .catch((err) => {
      console.log(err);
    });
});


//get 1 user data
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await User.findById(userId)
    .then(() => {
      res.status(200).send({ status: "user fetched", user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with get user", error: err });
    });
});

// Get all users, with optional filtering by role
router.route("/:role").get(async (req, res) => {
  let role = req.params.role;

  const query = role ? { role: role } : {};

  User.find(query)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching users" });
    });
});

module.exports = router;
