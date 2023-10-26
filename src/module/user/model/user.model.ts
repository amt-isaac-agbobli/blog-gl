import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class User {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field()
  verified: boolean;

  @Field()
  email: string;
}
