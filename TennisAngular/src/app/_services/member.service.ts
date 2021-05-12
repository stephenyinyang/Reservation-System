
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';
import {HttpClient} from '@angular/common/http';
import {Member} from '../_models/member';
import {App} from '../_models/app';




@Injectable({ providedIn: 'root' })
export class MemberService {



  constructor(private notif: NotificationService, private http: HttpClient) {}
  getDisabled() {
    return this.http.get<App>(`http://localhost:3030/app/getDisabled`);
  }
  setDisabled(option) {
    return this.http.post(`http://localhost:3030/app/setDisabled`, option);
  }

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
