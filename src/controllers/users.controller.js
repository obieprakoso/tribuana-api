const { errorHandler } = require("../util");
const { userService } = require("../service");
const baseResponse = require("../helper/responseDefault");

const getUserById = errorHandler(async (req, res) => {
  let resultGetUserById = await userService.getUserByIdService(req, res);
  return baseResponse(res, res.statusCode, "Success", resultGetUserById);
});
const getAllUserByActived = errorHandler(async (req, res) => {
  let resultGetAllUserByActived = await userService.getAllUserByActived(
    req,
    res
  );
  return baseResponse(
    res,
    res.statusCode,
    "Success",
    resultGetAllUserByActived
  );
});

module.exports = {
  getUserById,
  getAllUserByActived,
};
