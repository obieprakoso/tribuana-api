const { errorHandler, withTransaction } = require("../util");
const { roleService } = require("../service");

const addRole = errorHandler(
  withTransaction(async (req, res, session) => {
    return roleService.addRole(req, res, session);
  })
);
module.exports = {
  addRole,
};
