import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from '../../template/template';
import { EstadisticasService, ResumenEstadisticas } from '../../services/estadisticas';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, TemplateComponent],
  templateUrl: './estadisticas.html',
  styleUrls: ['./estadisticas.css'],
})
export class EstadisticasPage implements OnInit {
  private readonly estadisticasService = inject(EstadisticasService);

  resumen: ResumenEstadisticas | null = null;
  cargando = false;

  ngOnInit(): void {
    this.cargando = true;
    this.estadisticasService.getResumen().subscribe({
      next: (data) => {
        console.log('RESUMEN ESTADISTICAS', data);
        this.resumen = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      },
    });
  }
}
