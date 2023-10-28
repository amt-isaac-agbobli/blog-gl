import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerResolver } from './follower.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FollowerService, FollowerResolver, PrismaService],
})
export class FollowerModule {}
