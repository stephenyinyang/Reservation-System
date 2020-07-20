import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';
import {Reservations} from '../_models/Reservations';
import {NotificationService} from '../_services/notification.service';
import {ReservationService} from '../_services/reservation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  unconfirmedRecords: Reservations[] = [];
  confirmedRecords: Reservations[] = [];
  constructor(private userService: UserService,
              private notifService: NotificationService,
              private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.loadUnconfirmedReservations();
    this.loadConfirmedReservations();
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });

  }

  confirm() {
    this.loadUnconfirmedReservations();
    this.loadConfirmedReservations();
  }

  private loadConfirmedReservations() {
    this.reservationService.getConfirmedReservations().subscribe(
      reservationRecords => {
        this.confirmedRecords = reservationRecords;
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

  private loadUnconfirmedReservations() {
    this.reservationService.getUnconfirmedReservations().subscribe(
      reservationRecords => {
        this.unconfirmedRecords = reservationRecords;
        //console.log(this.reservationRecords);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

}
