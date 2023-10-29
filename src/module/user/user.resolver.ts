import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './model';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CurrentUser } from '../auth/decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto';

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

  @Mutation(() => User)
  async updateProfile(
    @Args('updatedInput') updatedInput: UpdateUserDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return await this.userService.updateUserProfile(updatedInput, user.id);
  }
  @Mutation(() => User)
  async chanePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return await this.userService.changePassword(changePasswordInput, user.id);
  }
}
