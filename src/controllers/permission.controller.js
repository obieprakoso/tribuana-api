const { errorHandler, withTransaction } = require("../util");
const { permissionService } = require("../service");

const addPermission = errorHandler(
  withTransaction(async (req, res, session) => {
    return permissionService.addPermission(req, res, session);
  })
);
module.exports = {
  addPermission,
};
