import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {Reservations} from '../_models/Reservations';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient) { }

  add(reservation: Reservations) {
    return this.http.post(`http://localhost:3030/reservation/addReservation`, reservation);
  }
  getAll() {
    return this.http.get<Reservations[]>(`http://localhost:3030/reservation/getAllReservations`);
  }
  getConfirmedReservations() {
    return this.http.get<Reservations[]>(`http://localhost:3030/reservation/getConfirmedReservations`);
  }

  getUnconfirmedReservations() {
    return this.http.get<Reservations[]>(`http://localhost:3030/reservation/getUnconfirmedReservations`);
  }

  getMyReservations() {
    return this.http.get<Reservations[]>(`http://localhost:3030/reservation/getMyReservations`);
  }

  deleteAdmin(reservation: Reservations) {
    return this.http.delete(`http://localhost:3030/reservation/${reservation.start}/${reservation.court}/
    ${reservation.end}/${reservation.createdBy.username}`);
  }

  delete(reservation: Reservations) {
    return this.http.delete(`http://localhost:3030/reservation/${reservation.start}/${reservation.court}/
    ${reservation.end}`);
  }

  deleteDate(date: Date) {
    return this.http.delete(`http://localhost:3030/reservation/deleteDate/${date}`);
  }

  confirm(reservation: Reservations) {
    //console.log("confirm");
    return this.http.post(`http://localhost:3030/reservation/confirm`, reservation);
  }

  unconfirm(reservation: Reservations) {
    return this.http.post(`http://localhost:3030/reservation/unconfirm`, reservation);
  }



}
