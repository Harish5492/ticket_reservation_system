import * as nodemailer from 'nodemailer';
import { EM } from '../constants';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = this.initSmtp();
  }

  private initSmtp(): nodemailer.Transporter {
    const smtpConfig = {
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: EM.MAILTRAP.USERNAME,
        pass: EM.MAILTRAP.PASSWORD,
      },
    };

    return nodemailer.createTransport(smtpConfig);
  }

  public async sendMail(to: string, link: string) {
    const mailOptions = {
      from: 'noreply@yourdomain.com',
      to: to,
      subject: 'Reset Your Password',
      text: `Click on the following link to reset your password: ${link}`,
      html: `<p>Click on the following link to reset your password: <a href="${link}">${link}</a></p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}

export default new EmailService();
