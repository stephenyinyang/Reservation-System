import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationService} from '../_services/reservation.service';
import {first} from 'rxjs/operators';
import {NotificationService} from '../_services/notification.service';
import { AuthService } from '../_services/auth.service';
import {Member} from '../_models/member';
import {Role} from '../_models/role';

@Component({
  selector: 'request-reservation',
  templateUrl: './request-reservation.component.html',
  styleUrls: ['./request-reservation.component.css']
})
export class RequestReservationComponent implements OnInit {
  requestForm: FormGroup;
  courts = [];
  court = 0;
  hours = 0;
  timeIndex = 0;
  startString = '';
  currentDate: Date;
  start: Date;
  end: Date;
  confirmed: boolean;
  currentMember: Member;

  // reservedBy: User;
  // court: number;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private reservationService: ReservationService,
              private notification: NotificationService,
              private auth: AuthService
  ) {
    this.auth.currentMember.subscribe(x => this.currentMember = x);
  }


  ngOnInit() {
    this.courts = [{name: 'Court 1'},
      {name: 'Court 2'}, {name: 'Court 3'}, {name: 'Court 4'}, {name: 'Court 5'}, {name: 'Court 6'} ];
    this.startString = this.route.snapshot.params["start"];
    this.currentDate = this.route.snapshot.params["day"];
    this.timeIndex = this.route.snapshot.params["time"];
    this.court = this.courts[this.route.snapshot.params["court"]].name;
    this.requestForm = this.formBuilder.group({
      court: this.court,
      hours: ['']
    });
  }
  save() {
    if (this.requestForm.value.hours >= .5 && this.requestForm.value.hours % .5 === 0) {
      this.currentDate = new Date(
        this.currentDate
      )
      this.start = new Date(0);
      this.start.setUTCSeconds((this.currentDate.setMinutes(480 + 30 * this.timeIndex)) / 1000);
      this.requestForm.value.start = this.start;

      if (this.currentDate.getMinutes() === 30) {
        this.end = new Date(0);
        this.end.setUTCSeconds((this.currentDate.setMinutes(30 * ((this.requestForm.value.hours / .5) + 1))) / 1000);
      } else {
        this.end = new Date(0);
        this.end.setUTCSeconds((this.currentDate.setMinutes(30 * (this.requestForm.value.hours / .5))) / 1000);
      }
      this.requestForm.value.end = this.end;
      if (this.requestForm.value.court === "Court 1") {
        this.requestForm.value.court = 1;
      } else if (this.requestForm.value.court === "Court 2") {
        this.requestForm.value.court = 2;
      } else if (this.requestForm.value.court === "Court 3") {
        this.requestForm.value.court = 3;
      } else if (this.requestForm.value.court === "Court 4") {
        this.requestForm.value.court = 4;
      } else if (this.requestForm.value.court === "Court 5") {
        this.requestForm.value.court = 5;
      } else {
        this.requestForm.value.court = 6;
      }
      // if user is admin, then automatically confirm reservation
      if (this.isAdmin()) {
        this.requestForm.value.confirmed = true;
      }
      // else, request reservation as unconfirmed
      else {
        this.requestForm.value.confirmed = false;
      }
      delete this.requestForm.value.hours;
      this.reservationService.add(this.requestForm.value)
        .pipe(first())
        .subscribe(
          resp => {
            this.notification.showNotif(resp, 'response');
            this.router.navigate(['/.', {day: this.route.snapshot.params["day"]}]);
            //this.notification.showNotif("Exercise Added Successfully!");
          },
          error => {
            this.notification.showNotif(error);
          });
    } else {
      this.notification.showNotif("Invalid Number of Hours!");
    }
  }
  cancel() {
    this.router.navigate(['/']);
  }
  isAdmin() {
    return this.currentMember && this.currentMember.role === Role.admin;
  }

}
