const RoleDao = require("../dao/RoleDao");
const logger = require("../config/logger");
const httpStatus = require("http-status");
const responseHandler = require("../helper/responseHandler");

class RoleService {
  constructor() {
    this.roleDao = new RoleDao();
  }

  /**
   * Create Role
   * @param {Object} roleBody
   * @returns {Object}
   */
  createRole = async (roleBody) => {
    try {
      let message = "Successfully add role";
      if (await this.roleDao.isNameExists(roleBody.name)) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "name already exists"
        );
      }
      let roleData = await this.roleDao.create(roleBody);
      if (!roleData) {
        message = "Create role failed! please try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      roleData = roleData.toJSON();

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        roleData
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };
}

module.exports = RoleService;
