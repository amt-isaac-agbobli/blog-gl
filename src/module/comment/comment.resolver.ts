import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';
import { CurrentUser } from '../auth/decorator';
import { User } from '../user/model';
import { CommentModel } from './model';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@Resolver()
@UseGuards(JwtGuard)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentModel)
  async createComment(
    @Args('commetInput') commentInput: CommentDto,
    @CurrentUser() user: User,
  ): Promise<object> {
    return this.commentService.createComment(commentInput, user);
  }
}
