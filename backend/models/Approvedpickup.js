const mongoose = require('mongoose');

// Define the ApprovedPickup schema
const approvedPickupSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'], // Example statuses
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the date when a pickup is created
    }
});

// Create the model from the schema
const ApprovedPickup = mongoose.model('ApprovedPickup', approvedPickupSchema);

// Export the model
module.exports = ApprovedPickup;
