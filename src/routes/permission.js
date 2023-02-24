const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();
router.post(
  "/add",
  middlewares.verifyAccessToken,
  controllers.permission.addPermission
);
module.exports = router;
