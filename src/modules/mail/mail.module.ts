import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          DOMAIN: process.env.MAILGUN_DOMAIN,
          API_KEY: process.env.MAILGUN_API_KEY,
          HOST: process.env.MAILGUN_HOST, // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [],
  controllers: [MailController],
})
export class MailModule {}
