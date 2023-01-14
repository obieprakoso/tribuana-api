const { errorHandler, withTransaction } = require("../util");
const { masterMenuService } = require("../service");
// const baseResponse = require("../helper/responseDefault");

const addMenu = errorHandler(
  withTransaction(async (req, res, session) => {
    return masterMenuService.addMenuService(req, res, session);
  })
);
const getAllMenuByActived = errorHandler(
  withTransaction(async (req, res, session) => {
    return masterMenuService.getAllMenuActived(req, res, session);
  })
);
const getMenuById = errorHandler(
  withTransaction(async (req, res, session) => {
    return masterMenuService.getMenuByIdService(req, res, session);
  })
);
module.exports = {
  addMenu,
  getAllMenuByActived,
  getMenuById,
};
