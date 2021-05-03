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
  sortReservations = [];
  sortMembers = [];
  lists = [];
  sortByReservation: String;
  sortByMember: String;
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
    this.sortReservations = [{name: 'Most Recent'},
      {name: 'By Date'}, {name: 'By First Name'}, {name: 'By Last Name'}];
    this.sortMembers = [{name: 'Newest'}, {name: 'By First Name'}, {name: 'By Last Name'}];
    this.sortByReservation = "Most Recent";
    this.sortByMember = "Newest";
  }

  confirm() {
    this.loadUnconfirmedReservations();
    this.loadConfirmedReservations();
  }

  changeSortReservations() {
    if (this.sortByReservation == "Most Recent") {
      this.loadUnconfirmedReservations();
      this.loadConfirmedReservations();
    }
    else if (this.sortByReservation == "By Date"){
      this.unconfirmedRecords.sort((a, b) => (a.start > b.start) ? 1 : -1);
      this.confirmedRecords.sort((a, b) => (a.start > b.start) ? 1 : -1);
    }
    else if (this.sortByReservation == "By First Name") {
      this.unconfirmedRecords.sort((a, b) => (a.createdBy.firstName > b.createdBy.firstName) ? 1 : -1);
      this.confirmedRecords.sort((a, b) => (a.createdBy.firstName > b.createdBy.firstName) ? 1 : -1);
    }
    else if (this.sortByReservation == "By Last Name") {
      this.unconfirmedRecords.sort((a, b) => (a.createdBy.lastName > b.createdBy.lastName) ? 1 : -1);
      this.confirmedRecords.sort((a, b) => (a.createdBy.lastName > b.createdBy.lastName) ? 1 : -1);
    }
    
  }

  changeSortMembers() {
    if (this.sortByMember == "Newest") {
      this.memberService.getAll().pipe(first()).subscribe(members => {
        this.members = members;
      });
    }
    else if (this.sortByMember == "By First Name"){
      this.members.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    }
    else if (this.sortByMember == "By Last Name") {
      this.members.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
    }
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
