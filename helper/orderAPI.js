const axios = require('axios');

async function getOrderStatus(orderId) {
   const response = await axios({
        method: "get",
        url: `https://667009f30900b5f8724927c3.mockapi.io/flights/Orderdata?orderId=${orderId}`,
      })
      return response.data;
}

module.exports = getOrderStatus;