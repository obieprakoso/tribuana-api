const PaymentDao = require("../dao/PaymentDao");
const UserDao = require("../dao/UserDao");
const PaymentMenuDao = require("../dao/PaymentMenuDao");
const logger = require("../config/logger");
const httpStatus = require("http-status");
const responseHandler = require("../helper/responseHandler");
const { paymentMethod } = require("../config/constant");

class PaymentService {
  constructor() {
    this.paymentDao = new PaymentDao();
    this.userDao = new UserDao();
    this.paymentMenuDao = new PaymentMenuDao();
  }

  /**
   * Create Payment Menu
   * @param {Object} paymentBody
   * @returns {Object}
   */
  createPayment = async (paymentBody) => {
    try {
      let message = "Successfully add Payment";
      //   if (await this.paymentDao.isNameExists(paymentBody.name)) {
      //     return responseHandler.returnError(
      //       httpStatus.BAD_REQUEST,
      //       "name already exists"
      //     );
      //   }
      let user = await this.userDao.findById(paymentBody.user_id);
      if (!user) {
        message = "User not found";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      let paymentMenu = await this.paymentMenuDao.findById(
        paymentBody.payment_menu_id
      );
      if (!paymentMenu) {
        message = "Payment menu not found";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      let paymentData = await this.paymentDao.create(paymentBody);
      if (!paymentData) {
        message = "Create Payment Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      paymentData = paymentData.toJSON();

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        paymentData
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };
}

module.exports = PaymentService;
