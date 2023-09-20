const httpStatus = require("http-status");
const RoleService = require("../service/RoleService");
const logger = require("../config/logger");

class RoleController {
  constructor() {
    this.roleService = new RoleService();
  }

  createRole = async (req, res) => {
    try {
      const role = await this.roleService.createRole(req.body);
      const { status } = role.response;

      const { message, data } = role.response;
      res.status(role.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getAllRole = async (req, res) => {
    try {
      var isTrueSet = req.params.is_active.toLowerCase() === "true";
      const roles = await this.roleService.getAllRole(isTrueSet);
      const { status } = roles.response;

      const { message, data } = roles.response;
      res.status(roles.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = RoleController;
