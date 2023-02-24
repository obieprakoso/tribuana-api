const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const roleMenuSchema = new Schema({
  role: { type: Schema.Types.ObjectId, ref: "Role" },
  master_menu: { type: Schema.Types.ObjectId, ref: "MasterMenu" },
  submenu: { type: Schema.Types.ObjectId, ref: "SubMenu" },
});

const RoleMenu = model("RoleMenu", roleMenuSchema);

module.exports = RoleMenu;
