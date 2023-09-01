const PaymentMenuDao = require("../dao/PaymentMenuDao");
const logger = require("../config/logger");
const httpStatus = require("http-status");
const responseHandler = require("../helper/responseHandler");

class PaymentMenuService {
  constructor() {
    this.paymentMenuDao = new PaymentMenuDao();
  }

  /**
   * Create Payment Menu
   * @param {Object} paymentMenuBody
   * @returns {Object}
   */
  createPaymentMenu = async (paymentMenuBody) => {
    try {
      let message = "Successfully add Payment Menu";
      if (await this.paymentMenuDao.isNameExists(paymentMenuBody.name)) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "name already exists"
        );
      }
      let paymentMenuData = await this.paymentMenuDao.create(paymentMenuBody);
      if (!paymentMenuData) {
        message = "Create Payment Menu Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      paymentMenuData = paymentMenuData.toJSON();

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        paymentMenuData
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  getAllPaymentMenu = async (is_active) => {
    try {
      let message = "Successfully get all Payment Menu";
      var datResPaymetMenus = JSON.stringify(
        await this.paymentMenuDao.findByWhere({
          is_active,
        }),
        null,
        2
      );
      let paymentMenuDatas = JSON.parse(datResPaymetMenus);

      return responseHandler.returnSuccess(
        httpStatus.OK,
        message,
        paymentMenuDatas
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };
  getDetailPaymentMenu = async (id) => {
    try {
      let message = "Successfully get detail Payment Menu";
      let paymentMenuData = await this.paymentMenuDao.findById(id);
      if (!paymentMenuData) {
        message = "Payment menu not found";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      return responseHandler.returnSuccess(
        httpStatus.OK,
        message,
        paymentMenuData
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  updatePaymentMenu = async (paymentMenuBody, id) => {
    try {
      let message = "Successfully update Payment Menu";
      if (await this.paymentMenuDao.isNameExists(paymentMenuBody.name)) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "name already exists"
        );
      }
      let paymentMenuData = await this.paymentMenuDao.findById(id);
      if (!paymentMenuData) {
        message = "Payment menu not found";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      paymentMenuData = paymentMenuData.toJSON();
      paymentMenuData.name = paymentMenuBody.name;
      paymentMenuData.position = paymentMenuBody.position;
      paymentMenuData.is_active = paymentMenuBody.is_active;

      let paymentMenuDataUpdate = await this.paymentMenuDao.updateById(
        paymentMenuData,
        id
      );
      paymentMenuDataUpdate = await this.paymentMenuDao.findById(id);
      return responseHandler.returnSuccess(
        httpStatus.OK,
        message,
        paymentMenuDataUpdate
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

module.exports = PaymentMenuService;
