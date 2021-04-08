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

  login() {
    this.router.navigate(['/login']);
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

  get showLogout() {
    return this.isAdmin || this.isMember && this.router.url === '/.';
  }

  get showLogin() {
    return !this.isAdmin && !this.isMember && this.router.url === '/.';
  }

  logout() {
    this.authService.logout();
    this.notifService.showNotif('Logged out!', 'dismiss');
    this.router.navigate(['/']);
  }
  admin() {
    this.router.navigate(['/admin']);
  }
}
