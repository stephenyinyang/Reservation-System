import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Member} from '../_models/member';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentMemberSubject: BehaviorSubject<Member>;
  public currentMember: Observable<Member>;


  constructor(private http: HttpClient) {
    this.currentMemberSubject = new BehaviorSubject<Member>(JSON.parse(localStorage.getItem('currentMember')));

    //this is used by app.component.ts
    // currentMember is turned into an Observable that will allow other parts of the app to subscribe and get notified when currentMemberSubject changes.
    this.currentMember = this.currentMemberSubject.asObservable();

  }


  public get currentMemberValue(): Member {
    return this.currentMemberSubject.value;
  }

  login(username: string, password: string) {
    // Changed to network based authentication strategy.

    // Read more here: https://angular.io/guide/http
    return this.http.post<any>(`http://localhost:3030/member/authenticate`, { username, password })
      .pipe(map(member => {
        // login successful if there's a jwt token in the response
        if (member && member.token) {
          localStorage.setItem('currentMember', JSON.stringify(member));
          this.currentMemberSubject.next(member);
        }

        return member;
      }));

  }


  logout() {
    // remove member from local storage to log member out
    localStorage.removeItem('currentMember');
    // notify all subscribers that member has logged out.
    this.currentMemberSubject.next(null);
  }


}
