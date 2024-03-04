const { paymentMethod } = require("../config/constant");

class paymentDto {
  id;
  user_name;
  payment_name;
  payment_amount;
  payment_method;
  user_id;
  payment_menu_id;
  payment_date;

  constructor(payment) {
    this.id = payment.id;
    this.user_name =
      `${payment.users.first_name} ${payment.users.last_name}`.trimEnd();
    this.payment_name = payment.payment_menus.name;
    this.payment_amount = payment.payment_amount;
    this.payment_method =
      payment.payment_method === 1
        ? "TRANSFER"
        : payment.payment_method === 2
        ? "CASH"
        : "CREDIT";
    this.user_id = payment.user_id;
    this.payment_menu_id = payment.payment_menu_id;
    this.payment_date = payment.payment_date;
  }
}

module.exports = paymentDto;
