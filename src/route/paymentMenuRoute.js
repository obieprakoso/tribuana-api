const express = require("express");
const PaymentMenuController = require("../controllers/PaymentMenuController");
const PaymentMenuValidator = require("../validator/PaymentMenuValidator");

const router = express.Router();
const auth = require("../middlewares/auth");

const paymentMenuController = new PaymentMenuController();
const paymentMenuValidator = new PaymentMenuValidator();

router.post(
  "/",
  auth(),
  paymentMenuValidator.paymentMenuCreateValidator,
  paymentMenuController.createPaymentMenu
);
router.get("/:is_active", auth(), paymentMenuController.getAllPaymentMenu);
router.get("/detail/:id", paymentMenuController.getDetailPaymentMenu);
router.put(
  "/change/:id",
  auth(),
  paymentMenuValidator.paymentMenuCreateValidator,
  paymentMenuController.updatePaymentMenu
);

module.exports = router;
