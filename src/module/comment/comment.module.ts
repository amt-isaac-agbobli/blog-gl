import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from '../post/post.service';

@Module({
  providers: [CommentService, CommentResolver, PrismaService, PostService],
})
export class CommentModule {}
