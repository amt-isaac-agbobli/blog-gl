import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FollowingDto } from './dto';
import { GraphQLError } from 'graphql';
import { Following } from './model';

@Injectable()
export class FollowerService {
  constructor(private readonly prisma: PrismaService) {}

  async followingExit(userId: number): Promise<boolean> {
    try {
      const userExit = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExit) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  async followerExit(
    followerId: number,
    followingId: number,
  ): Promise<boolean> {
    try {
      const followerExit = await this.prisma.follower.findMany({
        where: { AND: [{ followerId }, { followingId }] },
      });
      if (!followerExit) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  async follow(followingDto: FollowingDto, followerId: number) {
    const { followingId } = followingDto;
    try {
      if (followerId === followingId) {
        throw new GraphQLError('You cannot follow yourself');
      }
      const followingExit = await this.followingExit(followingId);
      if (!followingExit) {
        throw new GraphQLError('User not found');
      }
      const followerExit = await this.followerExit(followerId, followingId);
      if (followerExit) {
        throw new GraphQLError('You are already following this user');
      }
      const followUp = await this.prisma.follower.create({
        data: {
          followerId,
          followingId,
        },
      });
      if (!followUp) {
        throw new Error('Follow failed');
      }
      return await this.getFollowings(followerId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async unfollow(id: number, userId: number): Promise<Following[]> {
    try {
      const followerExit = await this.prisma.follower.findUnique({
        where: { id },
      });
      if (!followerExit) {
        throw new GraphQLError('Follower not found');
      }
      const unfollowUser = await this.prisma.follower.delete({
        where: { id },
      });
      if (!unfollowUser) {
        throw new Error('Unfollow failed');
      }
      return await this.getFollowings(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFollowings(userId: number): Promise<Following[]> {
    try {
      return await this.prisma.follower.findMany({
        where: { followerId: userId },
        include: { following: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFollowers(userId: number): Promise<Following[]> {
    try {
      return await this.prisma.follower.findMany({
        where: { followingId: userId },
        include: { following: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
