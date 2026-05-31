import { Routes } from '@angular/router';

import { ProyectosListComponent } from './pages/proyectos-list/proyectos-list';
import { ProyectoFormComponent } from './pages/proyecto-form/proyecto-form';
import { ClientesList } from './pages/clientes-list/clientes-list';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'proyectos',
    component: ProyectosListComponent,
  },
  {
    path: 'proyectos/nuevo',
    component: ProyectoFormComponent,
  },
  {
    path: 'proyectos/editar/:id',
    component: ProyectoFormComponent,
  },
  {
    path: 'proyectos/:id',
    component: ProyectoFormComponent,
  },
  {
    path: 'clientes',
    component: ClientesList,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
