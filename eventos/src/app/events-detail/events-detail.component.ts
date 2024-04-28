import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventosService } from '../services/eventos.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css'],
})
export class EventsDetailComponent implements OnInit {
  evento!: Evento;
  id!: string | null;
  myform!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(
    private eventService: EventosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDetail();
    this.myform = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      open_time: new FormControl(''),
      close_time: new FormControl(''),
      city: new FormControl(''),
      avg_score: new FormControl('')
    });
  }
  get f() {
    return this.myform.controls;
  }

  public async getDetail() {
    this.id = this.route.snapshot.paramMap.get('id');
    const data = await new Promise<Evento>((resolve) => {
      this.eventService.getEvent(this.id!).subscribe(resolve);
    });

    this.evento = data;
    this.myform = new FormGroup({
      name: new FormControl(this.evento.name),
      address: new FormControl(this.evento.address),
      open_time: new FormControl(this.evento.open_time),
      close_time: new FormControl(this.evento.close_time),
      city: new FormControl(this.evento.city),
      avg_score: new FormControl(this.evento.avg_score),
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.myform.invalid) {
      return;
    }

    this.loading = true;
    let evento_u = this.myform.getRawValue();
    console.log(evento_u);
    this.eventService.updateEvent(evento_u, this.evento.id);
    this.router.navigate(['events']);
  }
}
