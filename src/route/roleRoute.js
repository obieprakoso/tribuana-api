const express = require("express");
const RoleController = require("../controllers/RoleController");
// const PaymentMenuValidator = require("../validator/PaymentMenuValidator");

const router = express.Router();
const auth = require("../middlewares/auth");

const roleController = new RoleController();
// const paymentMenuValidator = new PaymentMenuValidator();

router.post("/", roleController.createRole);

module.exports = router;
