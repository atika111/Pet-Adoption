const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    // required: true,
  },
  firstName: String,
  lastName: String,
  address: String,
  phoneNumber: Number,
  picture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
  savedPets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
