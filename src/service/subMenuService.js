const models = require("../models");

async function addSubMenuService(req, res, session) {
  const menuDuplicate = await models.User.findOne({
    name: req.body.name,
  }).exec();
  if (menuDuplicate) {
    throw new HttpError(401, "Duplicate name sub menu");
  }
  const masterSubMenuDoc = models.SubMenu({
    name: req.body.name,
    master_menu: req.body.master_menu,
    ordering: req.body.ordering,
    url: req.body.url,
    icon: req.body.icon,
    is_active: req.body.is_active,
  });
  await masterSubMenuDoc.save({ session });

  return {
    id: masterSubMenuDoc.id,
    name: masterSubMenuDoc.name,
    master_menu: masterSubMenuDoc.master_menu,
    ordering: masterSubMenuDoc.ordering,
    url: masterSubMenuDoc.url,
    tittle: masterSubMenuDoc.tittle,
    icon: masterSubMenuDoc.icon,
    is_target_self: masterSubMenuDoc.is_target_self,
    is_active: masterSubMenuDoc.is_active,
  };
}
async function getAllSubMenuActived(req, res) {
  const subMenuAllActivedDoc = await models.SubMenu.find({
    is_active: true,
  }).exec();
  if (!subMenuAllActivedDoc) {
    throw new HttpError(400, "Sub menu not found");
  }
  return subMenuAllActivedDoc;
}
async function getSubMenuByIdService(req, res) {
  const SubMenuDoc = await models.SubMenu.findById(req.params.subMenuId).exec();

  if (!SubMenuDoc) {
    throw new HttpError(400, "Sub menu not found");
  }
  return SubMenuDoc;
}
async function getSubMenuByIdMenuService(req, res) {
  const SubMenuDoc = await models.SubMenu.find({
    master_menu: req.params.menuId,
    is_active: true,
  }).exec();

  if (!SubMenuDoc) {
    throw new HttpError(400, "Sub menu not found");
  }
  return SubMenuDoc;
}
module.exports = {
  addSubMenuService,
  getAllSubMenuActived,
  getSubMenuByIdService,
  getSubMenuByIdMenuService,
};
