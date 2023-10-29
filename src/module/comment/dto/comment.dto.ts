import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CommentDto {
  @Field()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @Field()
  postId: number;
}
