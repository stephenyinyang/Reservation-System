
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';
import {HttpClient} from '@angular/common/http';
import {Member} from '../_models/member';




@Injectable({ providedIn: 'root' })
export class MemberService {



  constructor(private notif: NotificationService, private http: HttpClient) {}

  getAll() {
    return this.http.get<Member[]>(`http://localhost:3030/member/allmembers`);
  }

  register(member: Member) {
    return this.http.post(`http://localhost:3030/member/register`, member);
  }

  renew(member: Member) {
    return this.http.post(`http://localhost:3030/member/renew`, member);
  }

  getMyReservations(member: Member): Observable<Member> {
    return this.http.get<Member>(`http://localhost:3030/reservation/getMyReservations`);
  }

  getAllReservations(member: Member): Observable<Member> {
    return this.http.get<Member>(`http://localhost:3030/reservation/getAllReservations`);
  }

}
