import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('FollowingObject')
class FollowingObject {
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  email: string;
}

@ObjectType('Following')
export class Following {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => Number, { nullable: true })
  followerId: number;

  @Field({ nullable: true })
  following: FollowingObject;
}
