import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventosService } from '../services/eventos.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventos: Evento[] = [];
  controls!: FormArray;
  constructor(private eventoService: EventosService, private authService:AuthService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  
  getControl(index: number, field: string): FormControl {
    return this.controls.at(index).get(field) as FormControl;
  }

  public logout()
  {
    this.authService.logout()
  //this.router.navigate(['login/'])
  }

  updateField(index: number, field: string) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.eventos = this.eventos.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: control.value,
          };
        }
        return e;
      });
    }
    let to_update = this.eventos[index];

    this.eventoService.updateEvent(to_update, to_update['id']);
  }

  getEvents(): void {
    this.eventoService.getEvents().subscribe((x) => {
      this.eventos = x.sort((a, b) => (a.id > b.id) ? -1 : 1);
      const toGroups = x.map((entity) => {
        const a = new FormControl();
        return new FormGroup({
          name: new FormControl(entity.name, Validators.required),
          address: new FormControl(entity.address),
          open_time: new FormControl(entity.open_time),
          close_time: new FormControl(entity.close_time),
          city: new FormControl(entity.city),
          avg_score: new FormControl(entity.avg_score),
        });
      });
      this.controls = new FormArray(toGroups);
    });
  }

  deleteEvent(id: number): void {
    this.eventoService.deleteEvent(id);
    this.eventos = this.eventos.filter(o => o.id!=id);
  }


}
