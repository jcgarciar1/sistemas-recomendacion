import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { User } from "../models/user";


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  api_url: string = "http://localhost:5000/";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser")!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {

    return this.http
      .post<any>(
        this.api_url + "api/login/",
        {email,password},
        httpOptions
      )
      .pipe(
        map((user) => {
          console.log(user)
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null!);
  }

  register(eventData: Object) {
    this.http
    .post(this.api_url + 'api/register/', eventData)
    .subscribe((data) => {
      console.log(data);
    });
  }
  change_password(old_password: string, new_password: string) {
    this.http.put<any>(
      this.api_url + "api/change-password/",
      { old_password, new_password },
      httpOptions
    );
  }

  reset_password_petition(email: string) {
    return this.http
      .post<any>(this.api_url + "api/password_reset/", { email }, httpOptions)
      .pipe();
  }

  reset_password(token: string, password: string)
  {
    return this.http
      .post<any>(this.api_url + "api/password_reset/confirm/", { password,token }, httpOptions)
      .pipe();
  }
}
