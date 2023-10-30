import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentDto, UpdateCommentDto } from './dto';
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

  @Mutation(() => CommentModel)
  async updateComment(
    @Args('updatedCommentInput') updatedCommentInput: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    return await this.commentService.updateComment(updatedCommentInput, user);
  }

  @Mutation(() => CommentModel)
  async deleteComment(
    @Args('commentId') commentId: number,
    @CurrentUser() user: User,
  ) {
    return await this.commentService.deleteComment(commentId, user);
  }
}
