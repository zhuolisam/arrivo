const db = require('../db/database');

const createPayment = async (paymentData) => {
  const query = `
    INSERT INTO "Payment" (userid, billid, amount, status, paymentmethod, createdat, updatedat)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    paymentData.userid,
    paymentData.billid,
    paymentData.amount,
    paymentData.status,
    paymentData.paymentmethod,
    new Date(),
    new Date(),
  ];
  const result = await db.one(query, values);
  return result;
};

const updatePaymentByBillId = async (billID, paymentData) => {
  const query = `
    UPDATE "Payment"
    SET status = $1,
        billplztransactionid = $2,
        updatedat = $3
    WHERE billid = $4
    RETURNING *;
  `;

  const values = [
    paymentData.status,
    paymentData.billplztransactionid,
    new Date(),
    billID,
  ];

  const payment = await db.one(query, values);
  return payment;
};

module.exports = {
  createPayment,
  updatePaymentByBillId,
};
