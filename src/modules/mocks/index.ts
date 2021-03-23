import * as faker from 'faker';

const UserFindAllMock = [
  {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    gender: faker.name.gender(),
    roles: 'admin',
  },
  {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    gender: faker.name.gender(),
    roles: 'editor',
  },
];

const UserFindById = {
  uuid: faker.random.uuid(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  username: faker.internet.userName(),
  gender: faker.name.gender(),
  roles: 'admin',
};

export { UserFindById };
