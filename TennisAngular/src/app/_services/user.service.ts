
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {



  constructor(private notif: NotificationService, private http: HttpClient) {

    // this.parecords = [{
    //   calories: 2345,
    //   minutes: 123,
    //   caloriegoal: 2000,
    //   minutegoal: 180,
    //   steps: 12000,
    //   activityType: PAType.walking,
    //   createdDate: new Date('2020-12-15T09:30:00')
    // },
    //   {
    //     calories: 1345,
    //     minutes: 63,
    //     caloriegoal: 2000,
    //     minutegoal: 180,
    //     steps: 15000,
    //     activityType: PAType.biking,
    //     createdDate: new Date('2020-11-13T09:30:00')
    //   },
    //   {
    //     calories: 1945,
    //     minutes: 83,
    //     caloriegoal: 2000,
    //     minutegoal: 180,
    //     steps: 13000,
    //     activityType: PAType.running,
    //     createdDate: new Date('2020-11-19T06:30:00')
    //   },
    //   {
    //     calories: 1745,
    //     minutes: 639,
    //     caloriegoal: 2400,
    //     minutegoal: 190,
    //     steps: 19000,
    //     activityType: PAType.running,
    //     createdDate: new Date('2020-08-13T03:55:00')
    //   }
    //
    // ];

  }

  getAll() {
    return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }


  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }

  getMyReservations(user: User): Observable<User> {
    return this.http.get<User>(`http://localhost:3030/reservation/getMyReservations`);
  }

  getAllReservations(user: User): Observable<User> {
    return this.http.get<User>(`http://localhost:3030/reservation/getAllReservations`);
  }

}
