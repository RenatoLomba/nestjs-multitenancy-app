import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { UsersService } from './users/users.service';
import { AuthServiceError } from './error-handling/auth-service-error';
import { AuthServiceErrorCodes } from './error-handling/auth-service-error-codes';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      this.logger.error('User not found');
      throw new AuthServiceError(AuthServiceErrorCodes.USER_NOT_FOUND);
    }

    const { password, ...userRest } = user;

    if (!bcrypt.compareSync(data.password, password)) {
      this.logger.error('Invalid password');
      throw new AuthServiceError(AuthServiceErrorCodes.INVALID_PASSWORD);
    }

    return {
      access_token: this.jwtService.sign(userRest),
    };
  }
}
