import { Role } from './role';

export class User {
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  email: string;
  token?: string;
}

