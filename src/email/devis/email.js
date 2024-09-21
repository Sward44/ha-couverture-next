"server only";
import nodemailer from "nodemailer";
import pug from "pug";
import path from "path";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.HOST
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

class Email {
  constructor() {
    const accessToken = oauth2Client.getAccessToken();
    this.prodTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sav@buzz-ready.com",
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    this.devTransporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f6473c6bce4408",
        pass: "f8cf1756e55fb5",
      },
    });
  }

  async getTemplate(templateName, options, prod = true) {
    try {
      const template = pug.renderFile(
        path.join(
          process.cwd(),
          `src/email/devis/template/${templateName}.pug`),
        options.metadata
      );
      let data;
      if (prod) {
        data = await this.prodTransporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: options.to,
          subject: options.subject,
          html: template,
        });
      } else {
        data = await this.devTransporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: options.to,
          subject: options.subject,
          html: template,
        });
      }

    } catch (e) {
      throw new Error(e);
    }
  }
}

const newEmail = new Email();

export default newEmail;
