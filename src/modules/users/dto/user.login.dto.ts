import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'User email',
        example: 'fulano@mail.com',
    })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    @ApiProperty({
        description: 'User password',
        minLength: 6,
        maxLength: 100,
        example: '123456',
    })
    readonly password: string;
}
