const SuperDao = require("./SuperDao");
const models = require("../models");
const { Op } = require("sequelize");

const Payment = models.payment;

class PaymentDao extends SuperDao {
  constructor() {
    super(Payment);
  }

  async getPaymentByFilter(startDate, endDate, userId, paymentMenu) {
    let whereClause = {};
    if (userId) {
      whereClause["user_id"] = userId;
    }
    if (paymentMenu) {
      whereClause["payment_menu_id"] = paymentMenu;
    }

    whereClause["payment_date"] = {
      [Op.between]: [startDate, endDate],
    };
    let documents = Payment.findAll({
      where: whereClause,
      include: ["users", "payment_menus"],
    });
    console.log("qqqq=", startDate, endDate);
    return documents;
  }

  async createWithTransaction(paymentMenu, transaction) {
    return Payment.create(paymentMenu, { transaction });
  }
}

module.exports = PaymentDao;
