import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateCommentDto {
  @IsNumber()
  @Field()
  id: number;

  @Field()
  @IsNotEmpty()
  content: string;
}
