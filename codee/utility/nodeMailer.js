const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str, data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ashishkachhadiya22@gmail.com", // generated ethereal user
      pass: "mhnjllgqzqkwdyhe", // generated ethereal password
    },
  });
  var Osubject, Otext, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing ${data.name}`;
    Ohtml = `
      <h1> Welcome to foodApp.com </h1><br>
      Hi, ${data.name}
      Hope you have good time !
      <br>
      Here are your details-<br>
      Name - ${data.name}
      <br>
      Email- ${data.email}
      `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
    <h1>foodApp.com</h1>
    Here is your link to reset your password
    ${data.resetPasswordLink}
    `;
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp " <ashishkachhadiya22@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // text: "Hello world?", // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
