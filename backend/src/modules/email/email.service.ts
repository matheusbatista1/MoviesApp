// src/modules/email/email.service.ts
import nodemailer from 'nodemailer';

export class EmailService {
  static async sendReleaseEmail(to: string, movieTitle: string, releaseDate: Date) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    const formattedDate = new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit', month: 'long', year: 'numeric' 
    }).format(releaseDate);

    const info = await transporter.sendMail({
      from: '"MoviesApp" <no-reply@moviesapp.com>',
      to,
      subject: `Lançamento de filme: ${movieTitle}`,
      text: `O filme "${movieTitle}" será lançado em ${formattedDate}. Não perca!`,
      html: `<p>O filme "<b>${movieTitle}</b>" será lançado em ${formattedDate}. Não perca!</p>`,
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  }
}