import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../enum';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
