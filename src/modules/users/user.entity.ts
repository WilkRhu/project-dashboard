import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from '../auth/enuns/role.enum';
import { UserDto } from './dto/user.dto';

@Table
export class User extends Model<UserDto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
  })
  gender: string;

  @Column({
    type: DataType.ENUM,
    values: [Role.ADM, Role.ACS, Role.EDT, Role.PRM],
  })
  roles: string;

  @Column({
    type: DataType.BLOB('long'),
  })
  avatar: ArrayBuffer;
}
