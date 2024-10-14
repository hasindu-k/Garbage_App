const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
dotenv.config(); // Load environment variables
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debugging: Check if MongoDB URL is loaded
console.log(process.env.MONGODB_URL);

const URL = process.env.MONGODB_URL;

if (!URL) {
    throw new Error("MongoDB connection URL is undefined. Make sure you have set MONGODB_URL in your .env file.");
}

mongoose.connect(URL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection successful!");
});

const userRouter = require("./routes/Users.js");
app.use("/user",userRouter);

const pickupRouter = require("./routes/SchedulePickups.js");
app.use("/schedulePickup",pickupRouter);
const collectedWastesRoutes = require('./routes/CollectedWastes.js');
app.use('/collectedwaste', collectedWastesRoutes);
const recycleRoutes = require('./routes/RecycleWastes.js');
app.use('/recycleWaste', recycleRoutes);

const garbageRouter = require("./routes/GarbageDetails.js");
app.use("/garbage",garbageRouter);

const approvedRouter = require("./routes/Approvedpickup.js");
app.use("/approvedpickup",approvedRouter);

const vehicleRouter = require("./routes/Vehicles.js");
app.use("/vehicle",vehicleRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
