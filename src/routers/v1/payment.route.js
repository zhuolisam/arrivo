const express = require('express');
const paymentController = require('../../controllers/payment.controller');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const paymentValidation = require('../../validations/payment.validation');
const roleType = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(
    auth([roleType.NORMAL]),
    validate(paymentValidation.createPayment),
    paymentController.createPayment
  );
router.route('/webhook').post(paymentController.handleWebhook);

module.exports = router;
