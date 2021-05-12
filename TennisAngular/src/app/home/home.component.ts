import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {AuthService} from '../_services/auth.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationService} from '../_services/reservation.service';
import {MemberService} from '../_services/member.service';
import {Reservations} from '../_models/Reservations';
import {Member} from '../_models/member';
import {Role} from '../_models/role';
import {App} from '../_models/app';
import {MatDialog} from '@angular/material/dialog';
import { RequestReservationComponent } from '../request-reservation/request-reservation.component';
import { MatSlideToggleChange } from '@angular/material';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {
  option: App;

  constructor(
    private notifService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthService,
    private dialog: MatDialog,
    private memberService: MemberService
  ) {
    this.authService.currentMember.subscribe(x => this.currentMember = x);
  }
  disabled: Boolean;
  currentMember: Member;
  request: boolean;
  reservations: Reservations[] = [];
  createdDate: Date;
  times: string[] = [];
  column_headers: string[] = [];
  cells = [
    {court: 1, reserved: false, name: ''},
    {court: 2, reserved: false, name: ''},
    {court: 3, reserved: false, name: ''},
    {court: 4, reserved: false, name: ''},
    {court: 5, reserved: false, name: ''},
    {court: 6, reserved: false, name: ''}
  ];
  ngOnInit() {
      this.request = false;
      if (this.route.snapshot.params.day === undefined) {
        this.createdDate = new Date();
        this.createdDate.setHours(0, 0, 0, 0);
      } else {
        this.createdDate = new Date(this.route.snapshot.params.day);
      }
      this.times.push('8:00 AM');
      this.times.push('8:30 AM');
      this.times.push('9:00 AM');
      this.times.push('9:30 AM');
      this.times.push('10:00 AM');
      this.times.push('10:30 AM');
      this.times.push('11:00 AM');
      this.times.push('11:30 AM');
      this.times.push('12:00 PM');
      this.times.push('12:30 PM');
      this.times.push('1:00 PM');
      this.times.push('1:30 PM');
      this.times.push('2:00 PM');
      this.times.push('2:30 PM');
      this.times.push('3:00 PM');
      this.times.push('3:30 PM');
      this.times.push('4:00 PM');
      this.times.push('4:30 PM');
      this.times.push('5:00 PM');
      this.times.push('5:30 PM');
      this.times.push('6:00 PM');
      this.times.push('6:30 PM');
      this.times.push('7:00 PM');
      this.times.push('7:30 PM');
      this.times.push('8:00 PM');
      this.times.push('8:30 PM');
      this.times.push('9:00 PM');
      this.times.push('9:30 PM');
      this.times.push('10:00 PM');
      this.times.push('10:30 PM');
      this.column_headers.push('Court 1');
      this.column_headers.push('Court 2');
      this.column_headers.push('Court 3');
      this.column_headers.push('Court 4');
      this.column_headers.push('Court 5');
      this.column_headers.push('Court 6');
    }
    ngAfterViewInit() {
      this.memberService.getDisabled().subscribe(
        option => {
          this.disabled = option.disabled;
          if (option.disabled) {
            for (let c = 0; c < 6; c++) {
              for (let r = 0; r < 30; r++) {
                const id = String(r) + String(c);
                document.getElementById(id).innerHTML = '';
                document.getElementById(id).className = 'disabled';
              }
            }
          }
          else {
            this.updateTable();
          }
        }
      );
    }
    toggle(event: MatSlideToggleChange) {
      this.memberService.setDisabled({
        disable: event.checked
      })
      .pipe(first())
      .subscribe(
        data => {
          if (event.checked) {
            for (let c = 0; c < 6; c++) {
              for (let r = 0; r < 30; r++) {
                const id = String(r) + String(c);
                document.getElementById(id).className = 'disabled';
                document.getElementById(id).innerHTML = '';
              }
            }
          }
          else {
            this.updateTable();
          }
          if (event.checked) {
            this.notifService.showNotif('Reservations are now closed!', 'dismiss');
          }
          else {
            this.notifService.showNotif('Reservations are now open!', 'dismiss');
          }
        },
        error => {
          this.notifService.showNotif(error, 'error');
        });
    }
    updateTable() {
    for (let c = 0; c < 6; c++) {
      for (let r = 0; r < 30; r++) {
        const id = String(r) + String(c);
        document.getElementById(id).className = 'cell';
        document.getElementById(id).innerHTML = '';
      }
    }
    this.reservationService.getConfirmedReservations().subscribe(
        reservations => {
          this.reservations = reservations;
          for (let i = 0; i < this.reservations.length; i++) {
            if (this.createdDate.getDate() ===  (new Date(this.reservations[i].start)).getDate()
            && this.createdDate.getMonth() ===  (new Date(this.reservations[i].start)).getMonth()
            && this.createdDate.getFullYear() ===  (new Date(this.reservations[i].start)).getFullYear()) {

                let startTimeIndex = ((new Date(this.reservations[i].start)).getHours() - 8) * 2;
                let endTimeIndex = ((new Date(this.reservations[i].end)).getHours() - 8) * 2;
                if ((new Date(this.reservations[i].start)).getMinutes() === 30) {
                startTimeIndex += 1;
              }
                if ((new Date(this.reservations[i].end)).getMinutes() === 30) {
                endTimeIndex += 1;
              }
                const nameID = String(startTimeIndex) + String(this.reservations[i].court - 1);
                if (this.isAdmin) {
                  document.getElementById(nameID).innerHTML = this.reservations[i].createdBy.firstName;
                }
                for (let j = startTimeIndex; j < endTimeIndex; j++) {
                  const id = String(j) + String(this.reservations[i].court - 1);
                  document.getElementById(id).className = 'confirmed';
                }
            }
          }

    },
  error => {
  this.notifService.showNotif(error.toString(), 'warning'); });
      this.reservationService.getUnconfirmedReservations().subscribe(
        reservations => {
          this.reservations = reservations;
          for (let i = 0; i < this.reservations.length; i++) {
            if (this.createdDate.getDate() ===  (new Date(this.reservations[i].start)).getDate()
              && this.createdDate.getMonth() ===  (new Date(this.reservations[i].start)).getMonth()
              && this.createdDate.getFullYear() ===  (new Date(this.reservations[i].start)).getFullYear()) {

              let startTimeIndex = ((new Date(this.reservations[i].start)).getHours() - 8) * 2;
              let endTimeIndex = ((new Date(this.reservations[i].end)).getHours() - 8) * 2;
              if ((new Date(this.reservations[i].start)).getMinutes() === 30) {
                startTimeIndex += 1;
              }
              if ((new Date(this.reservations[i].end)).getMinutes() === 30) {
                endTimeIndex += 1;
              }
              const nameID = String(startTimeIndex) + String(this.reservations[i].court - 1);
              if (this.isAdmin) {
                document.getElementById(nameID).innerHTML = this.reservations[i].createdBy.firstName;
              }
              for (let j = startTimeIndex; j < endTimeIndex; j++) {
                const id = String(j) + String(this.reservations[i].court - 1);
                document.getElementById(id).className = 'pending';
              }
            }
          }

        },
        error => {
          this.notifService.showNotif(error.toString(), 'warning'); });
    }

  public get requesting(): boolean {
    return this.request;
  }

  get isAdmin() {
    return this.currentMember && this.currentMember.role === Role.admin;
  }
  

  get isMember() {
    return this.currentMember && this.currentMember.role === Role.member;
  }

  get isLoggedIn() {
    return this.isAdmin || this.isMember;
  }

  changedDate(event: MatDatepickerInputEvent<Date>) {
    this.createdDate = event.value;
    this.memberService.getDisabled().subscribe(
      option => {
        this.disabled = option.disabled;
        if (option.disabled) {
          for (let c = 0; c < 6; c++) {
            for (let r = 0; r < 30; r++) {
              const id = String(r) + String(c);
              document.getElementById(id).innerHTML = '';
              document.getElementById(id).className = 'disabled';
            }
          }
        }
        else {
          this.updateTable();
        }
      }
    );
  }

  edit(cell: string, index: number, timeIndex: number) {
    if (this.isLoggedIn) {
      if ( document.getElementById(String(timeIndex) + String(index)).className === 'pending' ||
        document.getElementById(String(timeIndex) + String(index)).className === 'confirmed') {
        this.notifService.showNotif('This Time is Unavailable!');
      } else if (document.getElementById(String(timeIndex) + String(index)).className === 'disabled') {
        this.notifService.showNotif('Requesting is Unavailable at This Time!');
      }
      else {
        this.request = true;
        const dialogRef = this.dialog.open(RequestReservationComponent, {
          data: {
            start: cell, time: timeIndex, day: this.createdDate, court: index
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.memberService.getDisabled().subscribe(
            option => {
              this.disabled = option.disabled;
              if (option.disabled) {
                for (let c = 0; c < 6; c++) {
                  for (let r = 0; r < 30; r++) {
                    const id = String(r) + String(c);
                    document.getElementById(id).innerHTML = '';
                    document.getElementById(id).className = 'disabled';
                  }
                }
              }
              else {
                this.updateTable();
              }
            }
          );
        });
        //this.router.navigate(['/requestReservation', {start: cell, time: timeIndex, day: this.createdDate, court: index}]);
      }
    }
    else {
      this.notifService.showNotif('Must be a member to reserve online!', 'dismiss');
    }
  }
}

