import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: PostDto, authorId: number) {
    try {
      return await this.prisma.post.create({
        data: {
          ...data,
          authorId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
