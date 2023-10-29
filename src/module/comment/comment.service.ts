import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from '../post/post.service';
import { CommentDto } from './dto';
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
}
