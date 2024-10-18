const mongoose = require("mongoose");

const collectedWasteSchema = new mongoose.Schema({
  truckNumber: { type: String, required: true },
  wasteCollector: { type: String, required: true },
  area: { type: String, required: true },
  paperWaste: { type: Number, required: true }, // Change to Number for correct type
  foodWaste: { type: Number, required: true }, // Change to Number for correct type
  polytheneWaste: { type: Number, required: true }, // Change to Number for correct type
  totalWaste: { type: Number, required: true }, // Change to Number for correct type
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CollectedWaste", collectedWasteSchema);
