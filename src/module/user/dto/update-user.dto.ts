import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ description: 'First name' })
  @IsString()
  firstName: string;

  @Field({ description: 'Last name' })
  @IsString()
  lastName: string;
}
