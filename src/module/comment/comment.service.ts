import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from '../post/post.service';
import { CommentDto, UpdateCommentDto } from './dto';
import { User } from '../user/model';
import { GraphQLError } from 'graphql';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postService: PostService,
  ) {}

  async createComment(commentDto: CommentDto, user: User) {
    try {
      const { postId, content } = commentDto;
      const postExit = await this.postService.getPost(postId);
      if (!postExit)
        throw new GraphQLError('The post is not avalaible to comment on');
      const createdComment = await this.prisma.comment.create({
        data: {
          content,
          postId,
          authorId: user.id,
        },
      });
      if (!createdComment)
        throw new GraphQLError('Failed to comment on the post');
      return createdComment;
    } catch (error) {
      throw error;
    }
  }

  async getUserComment(id: number) {
    try {
      return await this.prisma.comment.findUnique({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async updateComment(updateComment: UpdateCommentDto, user: User) {
    try {
      const { id, content } = updateComment;

      const commentExit = await this.getUserComment(id);
      if (!commentExit) throw new GraphQLError('No coment Exit to upddate');

      if (commentExit.authorId !== user.id)
        throw new GraphQLError('You are not allowed to update this comment');

      const updatedComment = await this.prisma.comment.update({
        where: {
          id,
        },
        data: { content },
      });

      return updatedComment;
    } catch (error) {
      throw error;
    }
  }
}
