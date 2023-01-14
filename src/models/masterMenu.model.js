const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const masterMenuSchema = new Schema({
  name: { type: String, unique: true },
  ordering: { type: Number, unique: false },
  icon: String,
  is_active: Boolean,
});

const MasterMenu = model("MasterMenu", masterMenuSchema);

module.exports = MasterMenu;
