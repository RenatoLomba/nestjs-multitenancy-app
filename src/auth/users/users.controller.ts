import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create() {
    return this.usersService.create({
      fullName: 'Renato Lomba',
      phone: '(12) 93456-7890',
      email: 'rntlomba@gmail.com',
    });
  }
}
