import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosService } from '../../services/proyectos';

@Component({
  selector: 'app-proyectos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos-list.html',
})
export class ProyectosListComponent implements OnInit {

  proyectos: any[] = [];

  constructor(private service: ProyectosService) {}

  ngOnInit() {
    this.service.getProyectos().subscribe((data) => {
      console.log('DATA BACKEND:', data); // 👈 IMPORTANTE
      this.proyectos = data;
    });
  }
}