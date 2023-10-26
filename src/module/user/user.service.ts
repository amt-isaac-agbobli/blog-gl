import { Injectable } from '@nestjs/common';
import { User } from './model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
