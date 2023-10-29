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
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => Int, { nullable: true })
  authorId: number;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  comments: Comment;
}
