import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostDto {
  @Field(() => String, { description: 'title of the post' })
  title: string;

  @Field(() => String, { description: 'content of the post' })
  content: string;
}
