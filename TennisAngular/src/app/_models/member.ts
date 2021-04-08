import { Role } from './role';

export class Member {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  address: string;
  racketTension: number;
  racketType: string;
  racketStrings: string;
  role: Role;
  email: string;
  token?: string;
}

