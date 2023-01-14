const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subMenuSchema = new Schema({
  name: { type: String, unique: true },
  master_menu: { type: Schema.Types.ObjectId, ref: "MasterMenu" },
  ordering: { type: Number, unique: false },
  url: String,
  tittle: String,
  icon: String,
  is_target_self: Boolean,
  is_active: Boolean,
});

const SubMenu = model("SubMenu", subMenuSchema);

module.exports = SubMenu;
