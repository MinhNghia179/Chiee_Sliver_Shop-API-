const env = require('dotenv').config();

module.exports = {
  PORT:process.env.PORT || 8000,
  APP_URL:"http://localhost:8000",
  ORDER_STATUS : {
    WAIT_CONFIRM: {
      CODE: "WAIT_CONFIRM",
      NAME: "Chờ xác nhận",
    },
    CANCEL: {
      CODE: "CANCEL",
      NAME: "Hủy đơn hàng",
    },
    CONFIRM: {
      CODE: "CONFIRM",
      NAME: "Xác nhận đơn hàng",
    },
    DELIVERY: {
      CODE: "DELIVERY",
      NAME: "Đang giao hàng",
    },
    SUCCESSFUL_DELICERY: {
      CODE: "SUCCESSFUL_DELICERY",
      NAME: "Giao hàng thành công",
    },
  },
  EMAIL:env.parsed.EMAIL_SENDER,
  PASS:env.parsed.PASS_SENDER,
  URL_USER:env.parsed.URL_USER,
}