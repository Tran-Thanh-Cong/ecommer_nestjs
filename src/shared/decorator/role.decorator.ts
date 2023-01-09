import { SetMetadata, CustomDecorator } from '@nestjs/common';

import { ROLE } from '../../modules/auth/constants/role.constant';

export const ROLE_KEYS = 'role';
export const Roles = (...roles: ROLE[]): CustomDecorator<string> =>
  SetMetadata(ROLE_KEYS, roles);
