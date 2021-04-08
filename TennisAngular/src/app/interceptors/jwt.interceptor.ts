import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentMember = this.authenticationService.currentMemberValue;
    if (currentMember && currentMember.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentMember.token}`
        }
      });
    }
    // console.log('JWT Interceptor request:', request);
    return next.handle(request);
  }
}
