import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
@InputType()
export class ChangePasswordDto {
  @Field()
  @IsNotEmpty()
  oldPassword: string;

  @Field()
  @IsStrongPassword()
  password: string;

  @Field()
  @IsStrongPassword()
  confirmPassword: string;
}
