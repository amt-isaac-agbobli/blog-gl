import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class SignUpDto {
  @Field({ description: 'Email' })
  @IsEmail()
  email: string;

  @Field({ description: 'First name' })
  @IsString()
  firstName: string;

  @Field({ description: 'Last name' })
  @IsString()
  lastName: string;

  @Field({ description: 'Password' })
  @IsStrongPassword()
  password: string;
}
