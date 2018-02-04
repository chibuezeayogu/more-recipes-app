
import nodemailer from 'nodemailer';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @description nodemailer configuration
 *
 * @method
 *
 * @param {Object} mailOptions - content of mail to be sent
 *
 *@returns {String} error or success message
 */
const mailer = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTHORIZED_EMAIL,
      pass: process.env.AUTHORIZED_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return winston.info('Email not sent!', error);
    }
    return winston.info('Email sent', info.response);
  });
};

export default mailer;
