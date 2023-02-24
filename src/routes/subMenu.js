const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();
router.post(
  "/add",
  middlewares.verifyAccessToken,
  controllers.subMenu.addSubMenu
);
router.get(
  "/getAllSubMenuByActived",
  middlewares.verifyAccessToken,
  controllers.subMenu.getAllSubMenuByActived
);
router.get(
  "/:subMenuId",
  middlewares.verifyAccessToken,
  controllers.subMenu.getSubMenuById
);
router.get(
  "/menu/:menuId",
  middlewares.verifyAccessToken,
  controllers.subMenu.getSubMenuByMenuId
);
module.exports = router;
