// models/RecycleWaste.js
const mongoose = require('mongoose');

const recycleWasteSchema = new mongoose.Schema({
  truckNumber: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  paperWeight: {
    type: Number,
    required: true,
  },
  foodWeight: {
    type: Number,
    required: true,
  },
  polytheneWeight: {
    type: Number,
    required: true,
  },
  totalWaste: {
    type: Number,
  },
  calculatedCharge: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the model
module.exports = mongoose.model('RecycleWaste', recycleWasteSchema);
