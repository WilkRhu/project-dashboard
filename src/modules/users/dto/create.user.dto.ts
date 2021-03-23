import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Gender } from '../../auth/enuns/gender.enum';
import { Role } from '../../auth/enuns/role.enum';

export class CreateUserDto {
  @IsString()
  @Length(1, 100)
  readonly firstname: string;

  @IsString()
  @Length(1, 100)
  readonly lastname: string;

  @IsString()
  @Length(1, 20)
  readonly username: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(Gender)
  readonly gender: string;

  @IsEnum(Role)
  readonly roles: string;
}
