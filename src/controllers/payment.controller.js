const httpStatus = require('http-status');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const paymentModel = require('../models/payment.model');
const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const {
  billplzConfig,
  localURI,
  premiumPrice,
  dummyEmail,
} = require('../config/config');
const roleType = require('../config/roles');

const createPayment = catchAsync(async (req, res) => {
  // Double check if user is already premium
  const user = await userModel.getUserByEmail(req.body.email);
  if (user.membership === roleType.PREMIUM) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is already premium');
  }
  // Prepare Billplz request payload
  const billplzPayload = {
    collection_id: billplzConfig.collectionId,
    description: `Billing for Premium Membership for ${user.fullname}`,
    email: dummyEmail, // IMPORTANT: This shud be the user's email, but we're using developer's email for now
    name: user.fullname,
    amount: premiumPrice * 100, // Billplz uses amount in cents
    callback_url: `${localURI}/api/v1/payment/webhook/`, // webhook URL
  };

  try {
    // Make a POST request to create a Bill in Billplz
    const billplzResponse = await axios.post(
      `${billplzConfig.apiURL}/bills/`,
      billplzPayload,
      {
        headers: {
          Authorization: `Basic ${billplzConfig.secretKeyBase64}`,
        },
      }
    );
    const paymentData = {
      userid: user.userid,
      billid: billplzResponse.data.id,
      paymentmethod: 'Billplz',
      amount: parseFloat(billplzResponse.data.amount / 100).toFixed(2),
      status: 'Pending',
    };

    // Update payment record with Billplz response data
    await paymentModel.createPayment(paymentData);

    // Redirect user to Billplz payment page
    res.status(httpStatus.OK).send({ redirect: billplzResponse.url });
  } catch (error) {
    // Handle error
    console.error('Error creating Billplz Bill:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send('Payment initiation failed.');
  }
});

// Webhook handler for Billplz updates
const handleWebhook = catchAsync(async (req, res) => {
  const webhookData = req.body;
  // We need to verify the webhook signature in a real-world scenario
  // const isValidSignature = verifyBillplzWebhookSignature(
  //   webhookData,
  //   req.headers['x-signature']
  // );

  // if (!isValidSignature) {
  //   console.error('Invalid webhook signature');
  //   return res.sendStatus(httpStatus.BAD_REQUEST);
  // }

  // Handle and process Billplz webhook data
  const { id, state, paid_amount, transaction_id } = webhookData;

  try {
    // For example, you can update other fields like transaction_id, paid_amount, etc.
    const payment = await paymentModel.updatePaymentByBillId(id, {
      status: state,
      billplztransactionid: transaction_id,
    });

    const paid_amount_parse = parseFloat(paid_amount) / 100;
    // Update user's membership status
    if (payment.status === 'paid' && paid_amount_parse === premiumPrice) {
      await userModel.updateUserMembershipById(payment.userid, {
        membership: roleType.PREMIUM,
      });
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

  // Respond with appropriate status
  res.status(httpStatus.OK).send({ message: 'Payment successful' });
  return null;
});

module.exports = {
  createPayment,
  handleWebhook,
};
