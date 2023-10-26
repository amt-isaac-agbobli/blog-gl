import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';
import { Auth } from './model';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signUp(@Args('data') data: SignUpDto): Promise<object> {
    return await this.authService.createUser(data);
  }

  @Mutation(() => Auth)
  async signIn(@Args('data') data: SignInDto): Promise<object> {
    return await this.authService.signIn(data);
  }
}
