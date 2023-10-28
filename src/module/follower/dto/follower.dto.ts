import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType('FollowerInput')
export class FollowerDto {
  @Field({ description: 'The id of the follower' })
  @IsInt()
  followerId: number;

  @Field({ description: 'The id of the User being followed' })
  @IsInt()
  followingId: number;
}
