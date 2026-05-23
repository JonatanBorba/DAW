import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { ProyectosService } from '../../services/proyectos';

@Component({
  selector: 'app-proyectos-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './proyectos-list.html',
})
export class ProyectosListComponent implements OnInit {

  proyectos: any[] = [];

  constructor(
    private proyectosService: ProyectosService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('COMPONENTE CARGADO');

    this.proyectosService.getProyectos().subscribe({

      next: (data) => {

        console.log('LLEGARON DATOS');

        console.log(data);

        this.proyectos = data;

        this.cd.detectChanges();

      },

      error: (err) => {

        console.error('ERROR HTTP', err);

      }

    });

  }
}