import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  async findUserById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async updateUserProfile(updateProfile: UpdateUserDto, id: number) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateProfile,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, id: number) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          password: changePasswordDto.password,
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
