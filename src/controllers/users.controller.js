const { errorHandler, withTransaction } = require("../util");
const { userService } = require("../service");

const getUserById = errorHandler(
  withTransaction(async (req, res, session) => {
    return userService.getUserByIdService(req, res);
  })
);

const getAllUserByActived = errorHandler(
  withTransaction(async (req, res, session) => {
    return userService.getAllUserByActived(req, res);
  })
);

module.exports = {
  getUserById,
  getAllUserByActived,
};
