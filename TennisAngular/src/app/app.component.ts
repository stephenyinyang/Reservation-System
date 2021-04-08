import {Component} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from './_services/notification.service';
import {Member} from './_models/member';
import {Role} from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tennis Website';
  currentMember: Member;


  constructor(  private router: Router,
                private authService: AuthService,
                private notifService: NotificationService
  ) {
    this.authService.currentMember.subscribe(x => this.currentMember = x);
  }
  myReservationsClick() {
    this.router.navigate(['/myReservations']);
  }

  adminClick() {
    this.router.navigate(['/admin']);
  }

  get isAdmin() {
    // tslint:disable-next-line:max-line-length
    // In a later version of this code. We will define a class Member and have that encompass both the username and role. For now we will just hardcode it.
    return this.currentMember && this.currentMember.role === Role.admin;
  }

  get isMember() {

    return this.currentMember && this.currentMember.role === Role.member;
  }

  get isLoggedIn() {

    return this.isAdmin || this.isMember;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  admin() {
    this.router.navigate(['/admin']);
  }
}
