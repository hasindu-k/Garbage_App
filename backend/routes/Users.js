const bcrypt = require("bcryptjs");
const router = require("express").Router();
let User = require("../models/User");

router.route("/add").post((req, res) => {
  const { name, address, email, contact } = req.body;

  const newUser = new User({
    name,
    address,
    email,
    contact: Number(contact),
  });

  newUser
    .save()
    .then(() => {
      res.json("User Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error adding user" });
    });
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Not Registered, re-register" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

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

// User registration with password hashing
router.post("/register", async (req, res) => {
  const { name, address, email, contact, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      address,
      email,
      contact,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.json("User Registered");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Error registering user" });
  }
});

// //get all users
// router.route("/getall").get((req, res) => {
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
      console.error(err);
      res.status(500).json({ error: "Error fetching users" });
    });
});


// Get a single user by ID
router.route("/get/:id").get(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ status: "User fetched", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Get user by userid

router.get('/collector/:userid', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.userid });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile.' });
  }
});

// Update profile information
router.post('/collector/updateProfile', async (req, res) => {
  const { userId, name, address, email, contact } = req.body;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.name = name || user.name;
    user.address = address || user.address;
    user.email = email || user.email;
    user.contact = contact || user.contact;

    await user.save();
    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile.' });
  }
});

// Update password
router.post('/collector/updatePassword', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password.' });
  }
}); 


// Get all users, with optional filtering by role
router.route("/:role").get(async (req, res) => {
  const role = req.params.role;

  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users by role" });
  }
});
















router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  
  try {
    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).send({ status: "User not found" });
    }

    res.status(200).send({ status: "User fetched", user: user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error fetching user", error: err.message });
  }
});
router.put('/updatePassword/:userID', async (req, res) => {
  const { userID } = req.params;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing old or new password" });
  }

  // Logic to handle password update here
  // Find user by userID, verify old password, update with new password
  try {
    // Assuming you have a function to handle the password update
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the old password, then update with the new password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
