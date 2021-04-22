import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {MemberService} from '../_services/member.service';
import {Reservations} from '../_models/Reservations';
import {Member} from '../_models/member';
import {ReservationService} from '../_services/reservation.service';
import {Role} from '../_models/role';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {first} from 'rxjs/operators';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reservation-component',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input() reservationRecord: Reservations;
  @Output() confirmEvent = new EventEmitter();

  currentMember: Member;

  constructor(private notifService: NotificationService, private reservationService: ReservationService, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentMember.subscribe(x => this.currentMember = x);
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
          let start = new Date(this.reservationRecord.start);
          let end = new Date(this.reservationRecord.end);
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          var templateParams = {
            to_name: this.reservationRecord.createdBy.firstName,
            to_email: this.reservationRecord.createdBy.email,
            day: start.toLocaleDateString('en-US', options),
            start_time: start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            end_time: end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          };
            emailjs.send('service_yuv1ddd', 'template_qw699dx', templateParams, 'user_u0ANlqs4HsAUJCAkDH8R1')
              .then((result: EmailJSResponseStatus) => {
                console.log(result.text);
              }, (error) => {
                console.log(error.text);
              });
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

    // this.reservationService.deleteDate(reservation.start)
    //   .pipe(first())
    //   .subscribe(
    //     resp => {
    //       this.confirmEvent.emit();
    //       this.notifService.showNotif(resp, 'response');
    //     },
    //     error => {
    //       this.notifService.showNotif(error);
    //     });
  }

  get isAdmin() {
    // tslint:disable-next-line:max-line-length
    // In a later version of this code. We will define a class Member and have that encompass both the username and role. For now we will just hardcode it.
    return this.currentMember && this.currentMember.role === Role.admin;
  }
  get isMember() {
    return this.currentMember && this.currentMember.role === Role.member;
  }

}
