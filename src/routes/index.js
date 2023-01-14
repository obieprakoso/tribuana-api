const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const usersRouter = require("./users");
const masterMenuRouter = require("./masterMenu");
const subMenuRouter = require("./subMenu");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/menu", masterMenuRouter);
router.use("/subMenu", subMenuRouter);

module.exports = router;
