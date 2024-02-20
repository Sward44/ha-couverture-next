import nodemailer from "nodemailer";
import pug from "pug";
import fs from "fs";

class Email {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ha.couverture44@gmail.com",
        pass: "vsiw klzo kwfs qupj",
      },
    });

    try {
      const result = transporter.verify();
      console.log("Email transporter est prêt : ", result);
    } catch (e) {
      console.log("Le resultat de connexion n'est pas bon : ", e);
    }
  }

  async getTemplate(templateName, options) {
    try {
      const template = pug.renderFile(
        `src/utils/email-template/${templateName}.pug`,
        options.metadata
      );

      const data = await this.transporter.sendMail({
        from: options.to,
        to: options.to,
        subject: options.subject,
        html: template,
      });
      console.log("EMAIL OK ! : ", data);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new Email();
