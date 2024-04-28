import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventosService } from '../services/eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  myform!: FormGroup;

  constructor(private eventoService: EventosService,private router: Router) {}

  ngOnInit(): void {
    this.myform = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      open_time: new FormControl(''),
      close_time: new FormControl(''),
      city: new FormControl(''),
      avg_score: new FormControl(''),
    });
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.myform.invalid) {
      return;
    }

    let evento = this.myform.getRawValue();
    this.eventoService.createEvent(evento);
    this.router.navigate(["events"])

  }
}
