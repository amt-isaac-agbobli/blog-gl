import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';
import { Post } from './model';

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

  async getUserPost(authorId: number): Promise<object[]> {
    try {
      return await this.prisma.post.findMany({
        where: {
          authorId,
        },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
          likes: {
            include: {
              author: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllPost(): Promise<object[]> {
    try {
      return await this.prisma.post.findMany({
        include: {
          comments: {
            include: {
              author: true,
            },
          },
          likes: {
            include: {
              author: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getPost(id: number): Promise<object> {
    try {
      return await this.prisma.post.findUnique({
        where: { id },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
          likes: {
            include: {
              author: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
