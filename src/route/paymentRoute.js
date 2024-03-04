const express = require("express");
const PaymentController = require("../controllers/PaymentController");
// const PaymentMenuValidator = require("../validator/PaymentMenuValidator");

const router = express.Router();
const auth = require("../middlewares/auth");

const paymentController = new PaymentController();
// const paymentMenuValidator = new PaymentMenuValidator();

router.post("/", paymentController.createPayment);
router.get(
  "/:start_date/:end_date/:user_id?/:payment_menu_id?",
  paymentController.getPaymentByFilter
);
// router.get("/detail/:id", paymentMenuController.getDetailPaymentMenu);
// router.put(
//   "/change/:id",
//   auth(),
//   paymentMenuValidator.paymentMenuCreateValidator,
//   paymentMenuController.updatePaymentMenu
// );

module.exports = router;
