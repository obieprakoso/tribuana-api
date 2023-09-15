const express = require("express");
const UserController = require("../controllers/UserController");
// const PaymentMenuValidator = require("../validator/PaymentMenuValidator");

const router = express.Router();
const auth = require("../middlewares/auth");

const userController = new UserController();
// const paymentMenuValidator = new PaymentMenuValidator();

router.get("/:is_active", auth(), userController.getAllUser);
router.get("/detail/:id", auth(), userController.getDetailUser);

module.exports = router;
