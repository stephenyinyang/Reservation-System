import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {MemberService} from '../_services/member.service';
import {Reservations} from '../_models/Reservations';
import {ReservationService} from '../_services/reservation.service';

@Component({
  selector: 'app-memberview',
  templateUrl: './memberview.component.html',
  styleUrls: ['./memberview.component.css']
})
export class MemberviewComponent implements OnInit {

  reservationRecords: Reservations[] = [];

  constructor(private notifService: NotificationService, private reservationService: ReservationService) { }

  ngOnInit() {
    this.loadAllReservations();
  }

  private loadAllReservations() {
    //console.log('loadAllReservations()');
    this.reservationService.getMyReservations().subscribe(
      reservationRecords => {
        this.reservationRecords = reservationRecords;
        //console.log(this.reservationRecords);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

  confirm() {
    this.loadAllReservations();
  }



}
