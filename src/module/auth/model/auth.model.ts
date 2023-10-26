import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Auth')
export class Auth {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: string;

  @Field()
  verified: boolean;

  @Field()
  email: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
