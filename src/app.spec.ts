import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { User } from '../src/modules/users/user.entity';
import { ConfigService } from '../src/shared/config/config.service';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import {
  usercreate,
  usercreate2,
  usercreate3,
  usercreate4,
  usercreate5
} from './modules/mocks/repositoryMock/user';
import { UsersModule } from './modules/users/users.module';

describe('UsersService', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let userMaster;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        AuthModule,
        DatabaseModule,
        UsersModule,
        JwtModule.register({
          secret: process.env.JWTKEY,
          signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
      ],
      providers: [
        ConfigService,
        {
          provide: 'SEQUELIZE',
          useFactory: (configService: ConfigService) => {
            sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User]);
            return sequelize;
          },
          inject: [ConfigService],
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userMaster = await request(app.getHttpServer())
      .post('/api/v1/auth/signup')
      .send(usercreate);
  });

  describe('Users', () => {
    it('should success return findAll', async () => {
      const user = await request(app.getHttpServer())
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${userMaster.body.token}`);
      expect(user.status).toBe(200);
    }, 5000);
  });

  describe('Signup', () => {
    it('shoul error on create user for email required', async () => {
      const user = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send(usercreate2)
        .expect(HttpStatus.BAD_REQUEST);
      expect(user.body.message[0]).toBe('email must be an email');
    });

    it('shoul error on create user for password required', async () => {
      const user = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send(usercreate3)
        .expect(HttpStatus.BAD_REQUEST);

      expect(user.body.message[0]).toBe('password should not be empty');
    });

    it('shoul error on create user not gender', async () => {
      const user = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send(usercreate4)
        .expect(HttpStatus.BAD_REQUEST);

      expect(user.body.message[0]).toBe('gender must be a valid enum value');
    });

    it('shoul error on create user not roles', async () => {
      const user = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send(usercreate5)
        .expect(HttpStatus.BAD_REQUEST);

      expect(user.body.message[0]).toBe('roles must be a valid enum value');
    });

    it('should return success on create user', async () => {
      return await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send(usercreate)
        .expect(HttpStatus.CREATED);
    });
  });

  describe('Login', () => {
    it('should login success on user return token', async () => {
      return await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: usercreate.email,
          password: usercreate.password,
        })
        .expect(HttpStatus.CREATED);
    });

    it('should error login email', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'fulano@hotmail.com',
          password: usercreate.password,
        });
      expect(login.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(login.body.error).toBe('Unauthorized');
      expect(login.body.message).toBe('Invalid user credentials');
    });

    it('should error login password invalid', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: usercreate.email,
          password: 'sdfaadfdasf',
        });
      expect(login.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(login.body.error).toBe('Unauthorized');
      expect(login.body.message).toBe('Invalid user credentials');
    });

    it('should error login email empty', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: '',
          password: usercreate.password,
        });
      expect(login.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(login.body.message).toBe('Unauthorized');
    });

    it('should error login email empty', async () => {
      const login = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: usercreate.email,
          password: '',
        });
      expect(login.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(login.body.message).toBe('Unauthorized');
    });
  });

  afterAll(async () => {
    await User.destroy({
      truncate: true,
    });
    await app.close();
  });
});
