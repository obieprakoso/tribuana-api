const express = require("express");
const PaymentController = require("../controllers/PaymentController");
// const PaymentMenuValidator = require("../validator/PaymentMenuValidator");

const router = express.Router();
const auth = require("../middlewares/auth");

const paymentController = new PaymentController();
// const paymentMenuValidator = new PaymentMenuValidator();

router.post("/", paymentController.createPayment);
// router.get("/:is_active", auth(), paymentMenuController.getAllPaymentMenu);
// router.get("/detail/:id", paymentMenuController.getDetailPaymentMenu);
// router.put(
//   "/change/:id",
//   auth(),
//   paymentMenuValidator.paymentMenuCreateValidator,
//   paymentMenuController.updatePaymentMenu
// );

module.exports = router;
