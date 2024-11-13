import "dotenv/config";
import nodemailer from "nodemailer";
import generateErrorsUtils from "./generateErrorsUtils.js";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendMailUtils = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject,
      text: body,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    generateErrorsUtils("Error al enviar email", 500);
  }
};

export default sendMailUtils;
