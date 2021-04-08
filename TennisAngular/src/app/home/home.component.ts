import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationService} from '../_services/reservation.service';
import {Reservations} from '../_models/Reservations';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {


  constructor(
    private notifService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService
  ) {}
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
      this.updateTable();
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
                document.getElementById(nameID).innerHTML = this.reservations[i].createdBy.firstName;
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
              document.getElementById(nameID).innerHTML = this.reservations[i].createdBy.firstName;
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


    changedDate(event: MatDatepickerInputEvent<Date>) {
      this.createdDate = event.value;
      this.updateTable();
    }

    edit(cell: string, index: number, timeIndex: number) {
      if ( document.getElementById(String(timeIndex) + String(index)).className === 'pending' ||
        document.getElementById(String(timeIndex) + String(index)).className === 'confirmed') {
        this.notifService.showNotif('This Time is Unavailable!');
      } else {
        this.request = true;
        this.router.navigate(['/requestReservation', {start: cell, time: timeIndex, day: this.createdDate, court: index}]);
      }
    }


}

