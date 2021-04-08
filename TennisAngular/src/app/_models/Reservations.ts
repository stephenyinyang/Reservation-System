import {Member} from './member';


export class Reservations {
  start: Date;
  end: Date;
  confirmed: boolean;
  createdBy: Member;
  court: number;
}
