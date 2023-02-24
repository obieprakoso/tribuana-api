const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true },
  name: { type: String, unique: false },
  no_unit: { type: Number, unique: false },
  no_tlp: String,
  is_active: Boolean,
  password: { type: String, select: false },
  role: String,
  device: String,
});

const User = model("User", userSchema);

module.exports = User;
