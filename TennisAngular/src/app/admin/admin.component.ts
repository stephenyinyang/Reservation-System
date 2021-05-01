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
  sorts = [];
  lists = [];
  sortBy: String;
  selectedList: String;
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
    this.lists = [{name: 'Unconfirmed Reservations'},
      {name: 'Confirmed Reservations'}, {name: 'All Members'}];
    this.selectedList = "Unconfirmed Reservations";
    this.sorts = [{name: 'Most Recent'},
      {name: 'By Date'}, {name: 'By Name'}];
    this.sortBy = "Most Recent"
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
