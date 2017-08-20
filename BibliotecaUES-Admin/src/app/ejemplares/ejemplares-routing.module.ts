import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjemplaresRootComponent } from './ejemplares-root.component';
import { EjemplarComponent, EjemplarNuevoComponent, EjemplaresComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'ejemplares',
    component: EjemplaresRootComponent,
    children: [
      {
        path: '',
        component: EjemplaresComponent,
        canActivate: [AppAuthGuard],
        data: {politica: "catalogar"}
      },
      {
        path: 'nuevo',
        component: EjemplarNuevoComponent,
        canActivate: [AppAuthGuard],
        data: {politica: "crearAdquisicion"}
      },
      {
        path: ':id',
        component: EjemplarComponent,
        canActivate: [AppAuthGuard],
        data: {politica: "catalogar"}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjemplaresRoutingModule { }
