const nodemailer = require('nodemailer');
const { EMAIL, PASS } = require('../constants');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASS
  }
});

const defaultMessageMailOptionsContact = {
  from: EMAIL,
  subject: 'MT-Shop Feedback',
  html: `
  <div>
    <h2>Cảm ơn bạn đã phản hồi với chúng tôi.</h2>
    <p>Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.</p>


    <br/>
    <br/>
    <br/>
    <br/>
    ---  
    <br/>
    <div>Best regards,</div>
    <div><b>MT-Shop Teams</b></div>
    <div>Phone: (+84)988 491 385</div>
    <div>Address: Ha Noi, Vietnam</div>
  </div>
  `
};

const defaultMailOptions = {
  from: EMAIL,
  to: 'luuminh1742@gmail.com',
  subject: 'Sending Email',
  html: '<h1>Welcome</h1>'
};

const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendEmailContact = (email) => {
  const mailOptions = {
    ...defaultMessageMailOptionsContact,
    to:email
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendEmailForgotPassword = (email,link) => {
  const mailOptions = {
    to:email,
    from: EMAIL,
    subject: 'MT-Shop Đặt lại mật khẩu',
    html: `
    <div>
      <h2>Đặt lại mật khẩu tài khoản MT-Shop của bạn.</h2>
      <p>Truy cập vào liên kết bên dưới để đặt lại mật khẩu. Liên kết có hiệu lực trong 3 phút.</p>
      <p><a href='${link}'>Tại đây</a></p>
      <br/>
      <br/>
      <br/>
      ---  
      <br/>
      <div>Best regards,</div>
      <div><b>MT-Shop Teams</b></div>
      <div>Phone: (+84)988 491 385</div>
      <div>Address: Ha Noi, Vietnam</div>
    </div>
    `
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {sendEmail,sendEmailContact,sendEmailForgotPassword};