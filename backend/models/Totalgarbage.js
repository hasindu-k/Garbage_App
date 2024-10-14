const mongoose = require('mongoose');

const TotalGarbageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  totals: {
    glass: {
      type: Number,
      default: 0,
    },
    paper: {
      type: Number,
      default: 0,
    },
    foodWaste: {
      type: Number,
      default: 0,
    },
    plastic: {
      type: Number,
      default: 0,
    },
    steel: {
      type: Number,
      default: 0,
    },
  }
});

const TotalGarbage = mongoose.model('TotalGarbage', TotalGarbageSchema);

module.exports = TotalGarbage;
