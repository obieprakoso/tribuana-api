const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const masterMenuSchema = new Schema({
  name: { type: String, unique: true },
  ordering: { type: Number, unique: false },
  icon: String,
  url: String,
  is_active: Boolean,
  submenu_exist: Boolean,
});

const MasterMenu = model("MasterMenu", masterMenuSchema);

module.exports = MasterMenu;
