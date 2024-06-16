import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthServiceError } from './error-handling/auth-service-error';
import { AuthServiceErrorCodes } from './error-handling/auth-service-error-codes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    try {
      return await this.authService.login(data);
    } catch (err) {
      if (err instanceof AuthServiceError) {
        if (
          err.code === AuthServiceErrorCodes.USER_NOT_FOUND ||
          err.code === AuthServiceErrorCodes.INVALID_PASSWORD
        ) {
          throw new BadRequestException('Invalid email or password');
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
