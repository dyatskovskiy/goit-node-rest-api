import nodemailer from "nodemailer";

export class EmailService {
  static createTransporter() {
    // credentials
    const { MAILGUN_HOST, MAILGUN_PORT, MAILGUN_USER, MAILGUN_PASS } =
      process.env;

    const transporter = nodemailer.createTransport({
      host: MAILGUN_HOST,
      port: +MAILGUN_PORT,
      auth: {
        user: MAILGUN_USER,
        pass: MAILGUN_PASS,
      },
    });

    return transporter;
  }

  static configureEmail(to, subject, htmlContent) {
    const emailConfig = {
      from: process.env.MAILGUN_FROM,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    return emailConfig;
  }

  static async sendEmail(emailTransporter, emailConfig) {
    return new Promise((resolve, reject) => {
      emailTransporter.sendMail(emailConfig, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
}
