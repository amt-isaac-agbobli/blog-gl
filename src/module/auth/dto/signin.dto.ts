import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';
@InputType()
export class SignInDto {
  @Field({ description: 'Email' })
  @IsEmail()
  email: string;

  @Field({ description: 'Password' })
  @IsStrongPassword()
  password: string;
}
