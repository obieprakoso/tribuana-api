const httpStatus = require("http-status");
const PaymentMenuService = require("../service/PaymentMenuService");
const logger = require("../config/logger");

class PaymentMenuController {
  constructor() {
    this.paymentMenuService = new PaymentMenuService();
  }

  createPaymentMenu = async (req, res) => {
    try {
      const paymentMenu = await this.paymentMenuService.createPaymentMenu(
        req.body
      );
      const { status } = paymentMenu.response;

      const { message, data } = paymentMenu.response;
      res.status(paymentMenu.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getAllPaymentMenu = async (req, res) => {
    try {
      var isTrueSet = req.params.is_active.toLowerCase() === "true";
      const paymentMenus = await this.paymentMenuService.getAllPaymentMenu(
        isTrueSet
      );
      const { status } = paymentMenus.response;

      const { message, data } = paymentMenus.response;
      res.status(paymentMenus.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
  getDetailPaymentMenu = async (req, res) => {
    try {
      const paymentMenu = await this.paymentMenuService.getDetailPaymentMenu(
        req.params.id
      );
      const { status } = paymentMenu.response;

      const { message, data } = paymentMenu.response;
      res.status(paymentMenu.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
  updatePaymentMenu = async (req, res) => {
    try {
      const paymentMenu = await this.paymentMenuService.updatePaymentMenu(
        req.body,
        req.params.id
      );
      const { status } = paymentMenu.response;

      const { message, data } = paymentMenu.response;
      res.status(paymentMenu.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = PaymentMenuController;
