import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Gender } from 'src/modules/auth/enuns/gender.enum';
import { Role } from 'src/modules/auth/enuns/role.enum';

export class UserDto {
  readonly uuid: string;

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
  @IsNotEmpty()
  readonly password: string;

  @IsEnum(Gender)
  readonly gender: string;

  @IsEnum(Role)
  readonly roles: string;

  readonly avatar: ArrayBuffer;
}
