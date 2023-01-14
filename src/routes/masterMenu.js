const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();
router.post(
  "/add",
  middlewares.verifyAccessToken,
  controllers.masterMenu.addMenu
);
router.get(
  "/getAllMenuByActived",
  middlewares.verifyAccessToken,
  controllers.masterMenu.getAllMenuByActived
);
router.get(
  "/:menuId",
  middlewares.verifyAccessToken,
  controllers.masterMenu.getMenuById
);
module.exports = router;
