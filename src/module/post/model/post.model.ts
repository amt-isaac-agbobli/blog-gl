import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => String, { description: 'id of the post' })
  id: string;

  @Field(() => String, { description: 'title of the post' })
  title: string;

  @Field(() => String, { description: 'content of the post' })
  content: string;

  @Field(() => String, { description: 'author id of the post' })
  authorId: number;

  @Field(() => Date, { description: 'created at of the post' })
  createdAt: Date;

  @Field(() => Date, { description: 'updated at of the post' })
  updatedAt: Date;
}
