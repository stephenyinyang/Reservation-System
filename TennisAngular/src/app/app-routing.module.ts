import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminGuard} from './_services/admin-guard.service';
import {RegisterComponent} from './register/register.component';
import {RequestReservationComponent} from './request-reservation/request-reservation.component';
import {MemberviewComponent} from './memberview/memberview.component';
import {RenewComponent} from './renew/renew.component';

const routes: Routes = [{path: '.', component: HomeComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'requestReservation', component: RequestReservationComponent, canActivate: [AuthGuard]},
  {path: 'myReservations', component: MemberviewComponent, canActivate: [AuthGuard]},
  {path: 'renew', component: RenewComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '.'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
