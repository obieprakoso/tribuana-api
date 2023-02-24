const jwt = require("jsonwebtoken");
const models = require("../models");
const argon2 = require("argon2");
const { HttpError } = require("../error");

async function addPermission(req, res, session) {
  const permissionDuplicate = await models.Permission.findOne({
    name: req.body.name,
  }).exec();
  if (permissionDuplicate) {
    throw new HttpError(500, "Duplicate name permission");
  }
  const permissionDoc = models.Permission({
    name: req.body.name,
    description: req.body.description,
  });
  await permissionDoc.save({ session });

  return {
    id: permissionDoc.id,
    name: permissionDoc.name,
    description: permissionDoc.description,
  };
}

module.exports = {
  addPermission,
};
