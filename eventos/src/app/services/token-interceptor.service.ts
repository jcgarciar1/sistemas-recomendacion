import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/api/login/') || req.url.includes('/api/register/')) {
      return next.handle(req);
    }
    let jwttoken = req.clone({
      setHeaders: {
        Authorization: JSON.parse(localStorage.getItem('currentUser')!).token
      }
    })
    return next.handle(jwttoken);
  }
}
