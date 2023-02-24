const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  name: { type: String, unique: true },
  description: String,
});

const Role = model("Role", roleSchema);

module.exports = Role;
