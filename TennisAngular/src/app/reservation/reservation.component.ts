import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {Reservations} from '../_models/Reservations';
import {User} from '../_models/user';
import {ReservationService} from '../_services/reservation.service';
import {Role} from '../_models/role';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {first} from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reservation-component',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input() reservationRecord: Reservations;
  @Output() confirmEvent = new EventEmitter();

  currentUser: User;

  constructor(private notifService: NotificationService, private reservationService: ReservationService, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  confirm(reservation) {
    this.reservationService.confirm(reservation)
      .pipe(first())
      .subscribe(
        resp => {
          this.confirmEvent.emit();
          this.notifService.showNotif(resp, 'response');
        },
        error => {
          this.notifService.showNotif(error);
        });
  }

  unconfirm(reservation) {
    this.reservationService.unconfirm(reservation)
      .pipe(first())
      .subscribe(
        resp => {
          this.confirmEvent.emit();
          this.notifService.showNotif(resp, 'response');
        },
        error => {
          this.notifService.showNotif(error);
        });
  }

  deleteAdmin(reservation) {
    this.reservationService.deleteAdmin(reservation)
      .pipe(first())
      .subscribe(
        resp => {
          this.confirmEvent.emit();
          this.notifService.showNotif(resp, 'response');
        },
        error => {
          this.notifService.showNotif(error);
        });



  }
//   const inputDate = new Date(0);
//   const tempDate = reservation.start;
//   inputDate.setUTCSeconds((new Date(tempDate).setHours(0,0,0,0))/1000);
//   console.log(inputDate);
//   this.reservationService.deleteDate(inputDate)
// .pipe(first())
// .subscribe(
//     res => {
//   this.confirmEvent.emit();
//   this.notifService.showNotif(res, 'response');
// },
// error => {
//   this.notifService.showNotif(error);
// });

  delete(reservation) {
    this.reservationService.delete(reservation)
      .pipe(first())
      .subscribe(
        resp => {
          this.confirmEvent.emit();
          this.notifService.showNotif(resp, 'response');


        },
        error => {
          this.notifService.showNotif(error);
        });

    this.reservationService.deleteDate(reservation.start)
      .pipe(first())
      .subscribe(
        resp => {
          this.confirmEvent.emit();
          this.notifService.showNotif(resp, 'response');
        },
        error => {
          this.notifService.showNotif(error);
        });
  }

  get isAdmin() {
    // tslint:disable-next-line:max-line-length
    // In a later version of this code. We will define a class User and have that encompass both the username and role. For now we will just hardcode it.
    return this.currentUser && this.currentUser.role === Role.admin;
  }
  get isUser() {
    return this.currentUser && this.currentUser.role === Role.user;
  }

}
