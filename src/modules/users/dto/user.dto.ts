import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Gender } from '../../auth/enuns/gender.enum';
import { Role } from '../../auth/enuns/role.enum';

export class UserDto {
  readonly uuid: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty({
    description: 'Primeiro nome',
    minLength: 1,
    maxLength: 100,
    example: 'Fulano',
  })
  readonly firstname: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty({
    description: 'Segundo nome',
    minLength: 1,
    maxLength: 100,
    example: 'De Tal',
  })
  readonly lastname: string;

  @IsString()
  @Length(1, 20)
  @ApiProperty({
    description: 'User Name',
    minLength: 1,
    maxLength: 20,
    example: 'fulano123',
  })
  readonly username: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Primeiro nome',
    example: 'fulano@mail.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @ApiProperty({
    description: 'Primeiro nome',
    minLength: 6,
    maxLength: 100,
    example: '123456',
  })
  readonly password: string;

  @IsEnum(Gender)
  @ApiProperty({
    description: 'Gender user',
    enum: Gender,
  })
  readonly gender: string;

  @IsEnum(Role)
  @ApiProperty({
    description: 'Primeiro nome',
    name: 'role',
    enum: Role,
  })
  readonly roles: string;

  readonly avatar: ArrayBuffer;
}
