const models = require("../models");

async function getUserByIdService(req, res) {
  const userDoc = await models.User.findById(req.userId).exec();
  if (!userDoc) {
    throw new HttpError(400, "User not found");
  }
  return userDoc;
}
module.exports = {
  getUserByIdService,
};
