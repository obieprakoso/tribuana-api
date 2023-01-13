const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();

router.get(
  "/getUserById/:userId",
  middlewares.verifyAccessToken,
  controllers.users.getUserById
);
router.get(
  "/getAllUserByActived",
  middlewares.verifyAccessToken,
  controllers.users.getAllUserByActived
);

module.exports = router;
