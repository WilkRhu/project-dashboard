require('dotenv').config();
import { Injectable } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';

@Injectable()
export class MailService {
  constructor(private readonly mailgunService: MailgunService) {}

  public sendUserMail(email): void {
    this.mailgunService
      .sendEmail({
        from: process.env.MAILGUN_SMTP_LOGIN,
        to: email,
        subject: 'Usuário Cadastrado em nossa plataforma',
        text: 'O Usuario fo cadastrado com sucesso em nosso sistema',
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
