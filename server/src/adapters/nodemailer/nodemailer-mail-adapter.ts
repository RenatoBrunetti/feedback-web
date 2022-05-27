import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b8a1fe3bf4d12c",
    pass: "ecae886b88fd8e"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <no-repply@feedget.com>',
      to: 'Renato Brunetti <contato@renatobrunetti.com.br>',
      subject,
      html: body
    });
  }
}
