import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { UtilService } from 'src/common/util/util.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly utilService: UtilService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: SignUpDto): Promise<object> {
    try {
      const userExit = await this.userService.findUserByEmail(user.email);
      if (userExit)
        throw new HttpException('User with this email exit already', 409);
      const password = await this.utilService.hashPassword(user.password);
      const newUser = await this.prisma.user.create({
        data: { ...user, password },
      });
      delete newUser.password;
      const { id, email, role } = newUser;
      const token = await this.generateJwtToken({ id, email, role });
      return { ...newUser, ...token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async signIn(user: SignInDto): Promise<object> {
    try {
      const userExit = await this.userService.findUserByEmail(user.email);
      if (!userExit) throw new HttpException('User not found', 404);
      const isValid = await this.utilService.verifyPassword(
        user.password,
        userExit.password,
      );
      if (!isValid) throw new HttpException('Invalid password', 401);
      const { id, email, role } = userExit;

      const token = await this.generateJwtToken({ id, email, role });

      return { ...userExit, ...token };
    } catch (error) {
      throw error;
    }
  }
  private async generateJwtToken(user: {
    email: string;
    id: number;
    role: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = { email: user.email, sub: user.id, role: user.role };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: this.configService.get<string>('AT_SECRET'),
          expiresIn: this.configService.get('AT_Expires_IN'),
        }),
        this.jwtService.signAsync(payload, {
          secret: this.configService.get<string>('RT_SECRET'),
          expiresIn: this.configService.get('AT_Expires_IN'),
        }),
      ]);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  }
}
