const httpStatus = require("http-status");
const UserService = require("../service/UserService");
const logger = require("../config/logger");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUser = async (req, res) => {
    try {
      var isTrueSet = req.params.is_active.toLowerCase() === "true";
      const users = await this.userService.getAllUser(isTrueSet);
      const { status } = users.response;

      const { message, data } = users.response;
      res.status(users.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getDetailUser = async (req, res) => {
    try {
      const users = await this.userService.getUserByid(req.params.id);
      const { status } = users.response;

      const { message, data } = users.response;
      res.status(users.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = UserController;
