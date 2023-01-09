import { ROLE } from './../../../modules/auth/constants/role.constant';

export type OptionAuthRegister = {
  isAccountDisabled: boolean;
  isVerified: boolean;
  provider: string;
  role: ROLE[];
  token: string;
  expireIn: string;
};
