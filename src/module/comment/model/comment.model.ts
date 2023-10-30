import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  authorId: number;

  @Field({ nullable: true })
  postId: number;
}
