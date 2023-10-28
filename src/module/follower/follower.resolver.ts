import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FollowerService } from './follower.service';
import { FollowerIdDto, FollowingDto } from './dto';
import { User } from '../user/model';
import { CurrentUser } from '../auth/decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { Following } from './model';

@Resolver()
@UseGuards(JwtGuard)
export class FollowerResolver {
  constructor(private readonly followerService: FollowerService) {}

  @Mutation(() => [Following], { description: 'Follow a user' })
  async follow(
    @Args('followingInput') followingInput: FollowingDto,
    @CurrentUser() user: User,
  ): Promise<Following[]> {
    return await this.followerService.follow(followingInput, user.id);
  }

  @Mutation(() => [Following], { description: 'Unfollow a user' })
  async unfollow(
    @Args('followerIdInput') followingIdInput: FollowerIdDto,
    @CurrentUser() user: User,
  ): Promise<Following[]> {
    return await this.followerService.unfollow(followingIdInput.id, user.id);
  }

  @Query(() => [Following])
  async followings(@CurrentUser() user: User) {
    return await this.followerService.getFollowings(user.id);
  }

  @Query(() => [Following])
  async followers(@CurrentUser() user: User) {
    return await this.followerService.getFollowers(user.id);
  }
}
