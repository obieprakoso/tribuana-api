const { errorHandler, withTransaction } = require("../util");
const { subMenuService } = require("../service");
// const baseResponse = require("../helper/responseDefault");

const addSubMenu = errorHandler(
  withTransaction(async (req, res, session) => {
    return subMenuService.addSubMenuService(req, res, session);
  })
);
const getAllSubMenuByActived = errorHandler(
  withTransaction(async (req, res, session) => {
    return subMenuService.getAllSubMenuActived(req, res, session);
  })
);
const getSubMenuById = errorHandler(
  withTransaction(async (req, res, session) => {
    return subMenuService.getSubMenuByIdService(req, res, session);
  })
);
const getSubMenuByMenuId = errorHandler(
  withTransaction(async (req, res, session) => {
    return subMenuService.getSubMenuByIdMenuService(req, res, session);
  })
);
module.exports = {
  addSubMenu,
  getAllSubMenuByActived,
  getSubMenuById,
  getSubMenuByMenuId,
};
