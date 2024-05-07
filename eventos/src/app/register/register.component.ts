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
  states = [
    {value: 'AZ', viewValue: 'Arizona'},
    {value: 'AB', viewValue: 'Alberta'},
    {value: 'CA', viewValue: 'California'},
    {value: 'CO', viewValue: 'Colorado'},
    {value: 'DE', viewValue: 'Delaware'},
    {value: 'FL', viewValue: 'Florida'},
    {value: 'HI', viewValue: 'Hawaii'},
    {value: 'ID', viewValue: 'Idaho'},
    {value: 'IL', viewValue: 'Illinois'},
    {value: 'IN', viewValue: 'Indiana'},
    {value: 'LA', viewValue: 'Louisiana'},
    {value: 'MA', viewValue: 'Massachusetts'},
    {value: 'MI', viewValue: 'Michigan'},
    {value: 'MO', viewValue: 'Missouri'},
    {value: 'MT', viewValue: 'Montana'},
    {value: 'NE', viewValue: 'Nebraska'},
    {value: 'NV', viewValue: 'Nevada'},
    {value: 'NJ', viewValue: 'New Jersey'},
    {value: 'NY', viewValue: 'New York'},
    {value: 'PA', viewValue: 'Pennsylvania'},
    {value: 'SD', viewValue: 'South Dakota'},
    {value: 'TN', viewValue: 'Tennessee'},
    {value: 'TX', viewValue: 'Texas'},
    {value: 'UT', viewValue: 'Utah'},
    {value: 'VT', viewValue: 'Vermont'},
    {value: 'WA', viewValue: 'Washington'}

  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.myform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      state: new FormControl(''),

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
