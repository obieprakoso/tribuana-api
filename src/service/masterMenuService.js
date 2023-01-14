const models = require("../models");

async function addMenuService(req, res, session) {
  const menuDuplicate = await models.User.findOne({
    name: req.body.name,
  }).exec();
  if (menuDuplicate) {
    throw new HttpError(401, "Duplicate name menu");
  }
  const masterMenuDoc = models.MasterMenu({
    name: req.body.name,
    ordering: req.body.ordering,
    icon: req.body.icon,
    is_active: req.body.is_active,
  });
  await masterMenuDoc.save({ session });

  return {
    id: masterMenuDoc.id,
    name: masterMenuDoc.name,
    ordering: masterMenuDoc.ordering,
    icon: masterMenuDoc.icon,
    is_active: masterMenuDoc.is_active,
  };
}
async function getAllMenuActived(req, res) {
  const menuAllActivedDoc = await models.MasterMenu.find({
    is_active: true,
  }).exec();
  if (!menuAllActivedDoc) {
    throw new HttpError(400, "menu not found");
  }
  return menuAllActivedDoc;
}
async function getMenuByIdService(req, res) {
  const menuDoc = await models.MasterMenu.findById(req.params.menuId).exec();

  if (!menuDoc) {
    throw new HttpError(400, "Menu not found");
  }
  return menuDoc;
}
module.exports = {
  addMenuService,
  getAllMenuActived,
  getMenuByIdService,
};
