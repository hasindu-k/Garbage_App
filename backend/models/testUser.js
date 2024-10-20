const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique in the database
    lowercase: true, // Ensure the email is stored in lowercase
    match: [/\S+@\S+\.\S+/, "is invalid"], // Simple email format validation
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "collector", "resident", "recorder"], // Allow only specific roles
  },
});

// Apply the AutoIncrement plugin to create an auto-incrementing field for the `userId`
userSchema.plugin(AutoIncrement, { inc_field: "userId" });

const User = mongoose.models.UserTest || mongoose.model("UserTest", userSchema);

module.exports = User;
