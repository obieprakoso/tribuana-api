const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const permissionSchema = new Schema({
  name: { type: String, unique: true },
  description: String,
});

const Permission = model("Permission", permissionSchema);

module.exports = Permission;
