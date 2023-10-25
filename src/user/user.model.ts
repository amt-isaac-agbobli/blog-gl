import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class User {
  @Field()
  name: string;

  @Field()
  email: string;
}
