const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApprovedSchema = new Schema({
    userid: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {  // This will be used to track the status
        type: String,
        required: true,
        default: 'Pending' // Initialize as 'Pending' by default
    },
    truckid: {
        type: Number,
        required: true
    },
    collector:{
        type: String,
    }
});

const Approvedpickup = mongoose.model("Approvedpickup", ApprovedSchema);

module.exports = Approvedpickup;
