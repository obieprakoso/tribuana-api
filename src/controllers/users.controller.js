const { errorHandler } = require("../util");
const { HttpError } = require("../error");
const { userService } = require("../service");

const getUserById = errorHandler(async (req, res) => {
  return userService.getUserByIdService(req, res);
});

module.exports = {
  getUserById,
};
