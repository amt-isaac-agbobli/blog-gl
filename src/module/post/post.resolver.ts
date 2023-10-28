import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './model';
import { PostDto } from './dto';
import { CurrentUser } from '../auth/decorator';
import { User } from '../user/model';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@Resolver()
@UseGuards(JwtGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(
    @Args('postInput') postInput: PostDto,
    @CurrentUser() user: User,
  ): Promise<object> {
    return await this.postService.createPost(postInput, user.id);
  }
}
