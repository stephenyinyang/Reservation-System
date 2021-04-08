import { Component, OnInit } from '@angular/core';
import {Member} from '../_models/member';
import {MemberService} from '../_services/member.service';
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
  members: Member[] = [];
  unconfirmedRecords: Reservations[] = [];
  confirmedRecords: Reservations[] = [];
  constructor(private memberService: MemberService,
              private notifService: NotificationService,
              private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.loadUnconfirmedReservations();
    this.loadConfirmedReservations();
    this.memberService.getAll().pipe(first()).subscribe(members => {
      this.members = members;
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
