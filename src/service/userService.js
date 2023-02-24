const models = require("../models");

async function getUserByIdService(req, res) {
  const userDoc = await models.User.findById(req.params.idUser).exec();

  if (!userDoc) {
    throw new HttpError(400, "User not found");
  }
  return {
    id: userDoc.id,
    email: userDoc.email,
    name: userDoc.name,
    no_unit: userDoc.no_unit,
    no_tlp: userDoc.no_tlp,
    is_active: userDoc.is_active,
    role: userDoc.role,
    device: userDoc.device === undefined || null ? null : userDoc.device,
  };
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
