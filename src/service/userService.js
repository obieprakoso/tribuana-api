const models = require("../models");

async function getUserByIdService(req, res) {
  const userDoc = await models.User.findById(req.userId).exec();
  if (!userDoc) {
    throw new HttpError(400, "User not found");
  }
  return userDoc;
}
async function getAllUserByActived(req, res) {
  const userAllActivedDoc = await models.User.find({
    is_active: true,
  }).exec();
  if (!userAllActivedDoc) {
    throw new HttpError(400, "User not found");
  }
  return userAllActivedDoc;
}
module.exports = {
  getUserByIdService,
  getAllUserByActived,
};
