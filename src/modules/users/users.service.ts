import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../core/constants';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) { }

  async create(user: User): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(uuid: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { uuid },
      attributes: { exclude: ['password', 'email'] },
    });
  }

  async updateAvatarUser(avatar: ArrayBuffer, uuid: string): Promise<boolean> {
    const updata = await this.userRepository.update(
      { avatar },
      { where: { uuid } },
    );
    if (updata[0] < 1) {
      return false;
    }
    return true;
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAll({
      attributes: {
        exclude: ['password', 'email', 'avatar'],
      },
    });
  }

  async destroyUser(uuid: string): Promise<number> {
    return await this.userRepository.destroy<User>({ where: { uuid } });
  }
}
