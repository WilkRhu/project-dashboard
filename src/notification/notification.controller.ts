import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { EmailDto } from './dtos/email.dto';
import { PhoneDto } from './dtos/phone.dto';

@Controller('notification')
export class NotificationController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;
  async onModuleInit() {
    const requestPatters = ['notification-email'];
    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Post('email')
  async sendEmail(@Body() data: EmailDto): Promise<Observable<void>>{
    return await this.client.send('notification-email', data);
  }
  @Post('phone')
  sendPhone(@Body() data: PhoneDto) {
    return this.client.emit('notification-phone', data);
  }
}
