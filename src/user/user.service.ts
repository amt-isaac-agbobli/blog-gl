import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private readonly users = [
    { name: 'Tim', email: 'eam.ajkfs' },
    { name: 'Sue', email: 'eam.ajkfs' },
    { name: 'Bob', email: 'eam.ajkfs' },
  ];

  async findUsers(): Promise<User[]> {
    return this.users;
  }
}
