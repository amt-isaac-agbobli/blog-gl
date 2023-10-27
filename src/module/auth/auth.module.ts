import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { UtilService } from 'src/common/util/util.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy';

@Module({
  providers: [
    AuthService,
    PrismaService,
    AuthResolver,
    UserService,
    UtilService,
    JwtService,
    JwtStrategy,
  ],
  imports: [
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {}
