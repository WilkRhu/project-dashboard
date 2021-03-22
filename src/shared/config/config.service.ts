import { Injectable } from '@nestjs/common';
import { databaseConfig } from '../../core/database/database.config';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return databaseConfig.test;
  }

  get jwtConfig() {
    return { privateKey: databaseConfig.test.jwtPrivateKey };
  }
}
