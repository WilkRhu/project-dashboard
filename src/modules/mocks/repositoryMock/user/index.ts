import * as faker from 'faker';
import { CreateUserDto } from 'src/modules/users/dto/create.user.dto';

export const usercreate: CreateUserDto = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.internet.userName(),
  gender: faker.name.gender(),
  roles: 'admin',
};

export const usercreate2: CreateUserDto = {
  ...usercreate,
  email: 'no-email',
};
