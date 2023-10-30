import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Auth')
export class Auth {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  role: string;

  @Field({ nullable: true })
  verified: boolean;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  refreshToken: string;
}
