const SuperDao = require("./SuperDao");
const models = require("../models");

const Payment = models.payment;

class PaymentDao extends SuperDao {
  constructor() {
    super(Payment);
  }

  //   async isNameExists(name) {
  //     return PaymentMenu.count({ where: { name } }).then((count) => {
  //       if (count != 0) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   async createWithTransaction(paymentMenu, transaction) {
  //     return PaymentMenu.create(paymentMenu, { transaction });
  //   }
}

module.exports = PaymentDao;
