const crypto = require('crypto');
const { billplzConfig } = require('../config/config');

const verifyBillplzWebhookSignature = (webhookData, signature) => {
  const { secretKey } = billplzConfig;

  const calculatedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(JSON.stringify(webhookData))
    .digest('hex');

  return calculatedSignature === signature;
};

module.exports = {
  verifyBillplzWebhookSignature,
};
