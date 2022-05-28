import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'b8a1fe3bf4d12c',
    pass: 'ecae886b88fd8e'
  }
});
