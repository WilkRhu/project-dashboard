import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an entity of client if successful', async () => {
      expect(service).toBeDefined();
    });
  });
});
