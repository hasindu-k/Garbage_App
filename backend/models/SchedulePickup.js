const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickupSchema = new Schema({
  id: {
    type: Number,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  userID: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const schedulePickup = mongoose.model("schedulePickup", PickupSchema);

module.exports = schedulePickup;
