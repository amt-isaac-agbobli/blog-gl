import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './model';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CurrentUser } from '../auth/decorator';

@Resolver()
@UseGuards(JwtGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findUsers();
  }

  @Query(() => User)
  async profile(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findUserByEmail(user.email);
  }
}
