import {
  Controller,
  Patch,

  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('avatar')
export class AvatarUserController {
  constructor(private usersService: UsersService) { }
  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
    @Response() res: any,
  ) {
    const { buffer } = file;
    const { sub } = req.user;
    const uploadAvatar = await this.usersService.updateAvatarUser(buffer, sub);
    if (!uploadAvatar) {
      return res.status(400).send('Not update avatar user');
    }
    return res.status(200).json({
      message: 'Success update avatar user',
    });
  }
}
