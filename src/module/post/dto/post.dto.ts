import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PostDto {
  @IsNotEmpty()
  @Field(() => String, { description: 'title of the post' })
  title: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'content of the post' })
  content: string;
}
