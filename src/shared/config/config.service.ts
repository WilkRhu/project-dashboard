import { Injectable } from '@nestjs/common';
import { config } from '../../../config/config.test';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return config.database;
  }

  get jwtConfig() {
    return { secretOrKey: config.secretOrKey };
  }
}
