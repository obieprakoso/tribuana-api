const jwt = require("jsonwebtoken");
const models = require("../models");
const argon2 = require("argon2");
const { HttpError } = require("../error");

async function addRole(req, res, session) {
  const roleDuplicate = await models.Role.findOne({
    name: req.body.name,
  }).exec();
  if (roleDuplicate !== null) {
    throw new HttpError(500, "Duplicate name role");
  }
  const roleDoc = models.Role({
    name: req.body.name,
    description: req.body.description,
  });
  await roleDoc.save({ session });

  let menuArray = [];
  menuArray = req.body.menus;

  let menuRes = [];

  menuArray.forEach(async (elemenMenu, indeks, array) => {
    let menuLoop = [];
    const menuDoc = await models.MasterMenu.findById(elemenMenu.menu).exec();
    if (menuDoc.submenu_exist) {
      const subMenuLoop = [];
      elemenMenu.submenus.forEach(async (elemenSubmenu, indeks, array) => {
        const subMenuDoc = await models.SubMenu.findById(
          elemenSubmenu.submenu
        ).exec();
        const roleMenu = await models.RoleMenu({
          role: roleDoc.id,
          master_menu: menuDoc._id,
          submenu: subMenuDoc._id,
        });
        roleMenu.save();
        subMenuLoop.push(elemenSubmenu);
        // console.log("==SubmenuGetById=", subMenuDoc._id.toString());
      });
      console.log("==submenutrue=", xwwww);
      menuLoop.push({ menu: elemenMenu.menu, submenus: { subMenuLoop } });
    } else {
      const menu = models.RoleMenu({
        role: roleDoc.id,
        master_menu: elemenMenu.menu,
      });
      menu.save();
      menuLoop.push({ menu: elemenMenu.menu, submenus: [] });
    }
    menuRes.push(menuLoop);
  });

  return {
    id: roleDoc.id,
    name: roleDoc.name,
    description: roleDoc.description,
    menus: menuRes,
  };
}

module.exports = {
  addRole,
};
