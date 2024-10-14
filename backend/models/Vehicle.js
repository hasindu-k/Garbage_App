const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  truckNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
