import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';
import { GraphQLError } from 'graphql';

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

  async getPost(id: number) {
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

  async updatePost(id: number, userId: number, postDto: PostDto) {
    try {
      const postExit = await this.getPost(id);
      if (!postExit) throw new GraphQLError('No post fund to update');

      if (postExit.authorId !== userId)
        throw new GraphQLError('Access deny to edit this post');

      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: postDto,
      });

      if (!updatedPost) throw new GraphQLError('Post Field to update');

      return updatedPost;
    } catch (error) {
      throw error;
    }
  }
}
