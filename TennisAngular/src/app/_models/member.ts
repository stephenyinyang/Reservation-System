import { Role } from './role';

export class Member {
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  email: string;
  token?: string;
}

