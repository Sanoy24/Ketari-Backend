const nodemailer = require("nodemailer");

const emailSender = async (toEmail, subject, message) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: "mail.programming-dude.com",
      port: 465,
      secure: true,
      auth: {
        user: "founder@programming-dude.com",
        pass: `${process.env.EMAIL_HOST_PASS}`,
      },
    });
    const mailOptions = {
      from: "founder@programming-dude.com",
      to: toEmail,
      subject: subject,
      html: message,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    // console.log(error, "mail error")
    return error;
  }
};

module.exports = emailSender;
