import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/module/user/model';

@ObjectType()
class Comment {
  @Field(() => String, { nullable: true })
  content: string;
  @Field(() => String, { nullable: true })
  author: User;
}

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'id of the post' })
  id: number;

  @Field(() => String, { description: 'title of the post' })
  title: string;

  @Field(() => String, { description: 'content of the post' })
  content: string;

  @Field(() => Int, { description: 'author id of the post' })
  authorId: number;

  @Field(() => Date, { description: 'created at of the post' })
  createdAt: Date;

  @Field(() => Date, { description: 'updated at of the post' })
  updatedAt: Date;

  @Field({ nullable: true })
  comments: Comment;
}
