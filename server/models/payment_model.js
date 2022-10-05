const axios = require('axios');
const { sendMusdt } = require('./sendMusdt');
require('dotenv').config();

const TopUp = async (Data) => {
  const postData = {
    prime: Data.prime,
    partner_key: process.env.TappayPartnerKey,
    merchant_id: process.env.TappayMerchantId,
    amount: Data.topUpAmount,
    currency: 'TWD',
    details: 'Testing',
    cardholder:
        {
          phone_number: '0912345678',
          name: 'test',
          email: 'test@gmail.com'
        },
    remember: false
  };
  const response = await axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', postData, { headers: { 'x-api-key': 'partner_NpJg8vS4RGgjtUIJSisEgsHO1F4UvrkDSDNVDwEcnjOS3WlDYS8CsLdu' } });
  if (response.data.status === 0) {
    const tx = await sendMusdt(Data.topUpAmount);
    console.log(tx);
    return { data: tx.hash };
  } else {
    console.log('Tappay failure', response.data);
    return { data: response.data };
  }
};

module.exports = {
  TopUp
};
