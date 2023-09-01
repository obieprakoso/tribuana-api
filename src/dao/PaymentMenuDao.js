const SuperDao = require("./SuperDao");
const models = require("../models");

const PaymentMenu = models.payment_menu;

class PaymentMenuDao extends SuperDao {
  constructor() {
    super(PaymentMenu);
  }

  async isNameExists(name) {
    return PaymentMenu.count({ where: { name } }).then((count) => {
      if (count != 0) {
        return true;
      }
      return false;
    });
  }

  async createWithTransaction(paymentMenu, transaction) {
    return PaymentMenu.create(paymentMenu, { transaction });
  }
}

module.exports = PaymentMenuDao;
