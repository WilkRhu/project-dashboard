import * as faker from 'faker';
import { CreateUserDto } from 'src/modules/users/dto/create.user.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { uuid } from 'uuidv4';

export const usercreate: CreateUserDto = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.internet.userName(),
  gender: 'male',
  roles: 'admin',
};

export const usercreate2: CreateUserDto = {
  ...usercreate,
  email: 'no-email',
};

export const usercreate3: CreateUserDto = {
  ...usercreate,
  password: '',
};

export const usercreate4: CreateUserDto = {
  ...usercreate,
  gender: 'new',
};

export const usercreate5: CreateUserDto = {
  ...usercreate,
  roles: 'test',
};

export const userCreateUserDto: UserDto = {
  uuid: uuid(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.internet.userName(),
  gender: 'male',
  roles: 'admin',
  avatar: ArrayBuffer[faker.internet.avatar()],
};
