const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const usersRouter = require("./users");
const masterMenuRouter = require("./masterMenu");
const subMenuRouter = require("./subMenu");
const permissionRouter = require("./permission");
const roleRouter = require("./role");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/menu", masterMenuRouter);
router.use("/subMenu", subMenuRouter);
router.use("/permission", permissionRouter);
router.use("/role", roleRouter);

module.exports = router;
