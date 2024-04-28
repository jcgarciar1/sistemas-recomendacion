import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  myform!: FormGroup;
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.myform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  getErrorMessage() {
    if (this.myform.hasError('required')) {
      return 'You must enter a value';
    }

    return this.myform.hasError('email') ? 'Not a valid email' : '';
  }
  get f() {
    return this.myform.controls;
  }
  onSubmit() {
    console.log(this.myform.getRawValue())

    // stop here if form is invalid
    if (this.myform.invalid) {
      return;
    }
    let valores = this.myform.getRawValue()
    this.authService.register(valores)
    this.router.navigate(["login"])
  }
}
