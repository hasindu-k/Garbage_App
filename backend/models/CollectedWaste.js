// models/CollectedWaste.js
const mongoose = require("mongoose");

const collectedWasteSchema = new mongoose.Schema({
  truckNumber: { type: String, required: true },
  wasteCollector: { type: String, required: true },
  area: { type: String, required: true },
  paperWaste: { type: String, required: true },
  foodWaste: { type: String, required: true },
  polytheneWaste: { type: String, required: true },
  totalWaste: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CollectedWaste", collectedWasteSchema);
