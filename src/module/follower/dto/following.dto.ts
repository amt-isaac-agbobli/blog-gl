import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType('FollowingInput')
export class FollowingDto {
  @Field({ description: 'The id of the User being followed' })
  @IsInt()
  followingId: number;
}

@InputType('FollowerIdInput')
export class FollowerIdDto {
  @Field({ description: 'The id of the follower' })
  @IsInt()
  id: number;
}
