import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletedPost {
  @Field({ nullable: true })
  message: string;
}
