const httpStatus = require("http-status");
const PaymentService = require("../service/PaymentService");
const logger = require("../config/logger");

class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }

  createPayment = async (req, res) => {
    try {
      const payment = await this.paymentService.createPayment(req.body);
      const { status } = payment.response;

      const { message, data } = payment.response;
      res.status(payment.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = PaymentController;
