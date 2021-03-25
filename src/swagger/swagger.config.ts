import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
    .setTitle('Project Painel')
    .setDescription('Painel de usuários com authorization')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header'
        },
        'JWT-auth',
    )
    .build();

export default config;
