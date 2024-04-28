import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError, NEVER } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hide = true;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.myform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }


  get f() {
    return this.myform.controls;
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.myform.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(
      data => {
        this.router.navigate(["events"])
      },
      error => {
        this.error = error;
        console.log(error)
        this.loading = false;
      }
    )

  }
}
