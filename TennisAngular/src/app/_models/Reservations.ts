import {User} from './user';


export class Reservations {
  start: Date;
  end: Date;
  confirmed: boolean;
  createdBy: User;
  court: number;
}
