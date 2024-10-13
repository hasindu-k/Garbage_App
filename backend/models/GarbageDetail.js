const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const garbageSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    payment: {
        type: Number,  // Change from Double to Number
        required: true
    }
});

const garbage = mongoose.model("garbage", garbageSchema);

module.exports = garbage;
