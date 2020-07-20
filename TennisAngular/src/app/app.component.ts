import {Component} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from './_services/notification.service';
import {User} from './_models/user';
import {Role} from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tennis Website';
  currentUser: User;


  constructor(  private router: Router,
                private authService: AuthService,
                private notifService: NotificationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
  myReservationsClick() {
    this.router.navigate(['/myReservations']);
  }

  adminClick() {
    this.router.navigate(['/admin']);
  }

  get isAdmin() {
    // tslint:disable-next-line:max-line-length
    // In a later version of this code. We will define a class User and have that encompass both the username and role. For now we will just hardcode it.
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  get isUser() {

    return this.currentUser && this.currentUser.role === Role.user;
  }

  get isLoggedIn() {

    return this.isAdmin || this.isUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  admin() {
    this.router.navigate(['/admin']);
  }
}
