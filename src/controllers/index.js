const auth = require("./auth.controller");
const users = require("./users.controller");
const masterMenu = require("./masterMenu.controller");
const subMenu = require("./subMenu.controller");
const permission = require("./permission.controller");
const role = require("./role.controller");

module.exports = {
  auth,
  users,
  masterMenu,
  subMenu,
  permission,
  role,
};
