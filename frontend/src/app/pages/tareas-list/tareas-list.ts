import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { TemplateComponent } from '../../template/template';
import { ProyectosService } from '../../services/proyectos';
import { TareasService, TareaDTO } from '../../services/tareas';
import { GestionTareaComponent } from '../../tareas/gestion/gestion-tarea';

@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TemplateComponent,
    TableModule,
    ButtonModule,
    GestionTareaComponent,
  ],
  templateUrl: './tareas-list.html',
  styleUrls: ['./tareas-list.css'],
})
export class TareasListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly proyectosService = inject(ProyectosService);
  private readonly tareasService = inject(TareasService);

  proyectoId!: number;
  proyecto: any | null = null;
  tareas: TareaDTO[] = [];
  cargando = false;

  dialogVisible = false;
  tareaSeleccionada: TareaDTO | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!id) {
        return;
      }
      this.proyectoId = id;
      this.cargarProyecto();
      this.cargarTareas();
    });
  }

  cargarProyecto(): void {
    this.proyectosService.getProyecto(this.proyectoId).subscribe((data) => {
      this.proyecto = data;
    });
  }

  cargarTareas(): void {
    this.cargando = true;
    this.tareasService.getTareas(this.proyectoId).subscribe({
      next: (data) => {
        this.tareas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

  crearTarea(): void {
    this.tareaSeleccionada = null;
    this.dialogVisible = true;
  }

  editarTarea(tarea: TareaDTO): void {
    this.tareaSeleccionada = tarea;
    this.dialogVisible = true;
  }

  eliminarTarea(tarea: TareaDTO): void {
    if (!confirm('¿Seguro que querés eliminar esta tarea?')) {
      return;
    }
    this.tareasService.eliminarTarea(this.proyectoId, tarea.id).subscribe(() => {
      this.cargarTareas();
    });
  }
}
