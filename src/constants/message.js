const MESSAGE_SUCCESS = {
  SUCCESS:"Thành công",
  INSERT:"",
  UPDATE:"",
  UPDATE_PASSWORD:"Cập nhật mật khẩu thành công",
  LOGIN_SUCCESS: "Đăng nhập thành công",
  REGISTER: "Đăng ký tài khoản thành công",
  PERMISSION: "Cập nhật quyền thành công",
  ADD_TO_CART: "Thêm vào giỏ hàng thành công",
  UPDATE_TO_CART: "Cập nhật giỏ hàng thành công",
}

const MESSAGE_ERROR = {
  FAIL:"Thất bại",
  UPDATE_IMAGE: 'Lỗi cập nhật ảnh',
  OLD_PASSWORD_WRONG:'Mật cũ khẩu không trùng khớp',
  ACCOUNT_NOT_EXIST: "Tài khoản không tồn tại",
  WRONG_PASSWORD :"Mật khẩu sai",
  REGISTER: "Đăng ký tài khoản thất bại",
  NOT_LOGIN: "Bạn chưa đăng nhập!",
  EMAIL_EXIST: "Email đã đăng ký cho tài khoản khác!",
  PERMISSION: "Cập nhật quyền thất bại",
  ADD_TO_CART_ERROR: "Thêm vào giỏ hàng thất bại",
  CART_ERROR_AMOUNT: "Số số lượng sản phẩm không đủ",
}

module.exports = {
  MESSAGE_SUCCESS:MESSAGE_SUCCESS,
  MESSAGE_ERROR:MESSAGE_ERROR
}