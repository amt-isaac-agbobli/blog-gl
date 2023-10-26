import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { UtilService } from 'src/common/util/util.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    PrismaService,
    AuthResolver,
    UserService,
    UtilService,
    JwtService,
  ],
})
export class AuthModule {}
