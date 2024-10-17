const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },

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

userSchema.plugin(AutoIncrement, { inc_field: "id" });

const User = mongoose.model("User", userSchema);

module.exports = User;