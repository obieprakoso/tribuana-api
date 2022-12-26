const { errorHandler } = require("../util");
const { userService } = require("../service");
const baseResponse = require("../helper/responseDefault");

const getUserById = errorHandler(async (req, res) => {
  let resultGetUserById = await userService.getUserByIdService(req, res);
  return baseResponse(res, res.statusCode, "Success", resultGetUserById);
});

module.exports = {
  getUserById,
};
