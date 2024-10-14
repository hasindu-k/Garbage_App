const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  vehicleID: {
    type: Number,
  },
});

VehicleSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model('Vehicle', VehicleSchema);
