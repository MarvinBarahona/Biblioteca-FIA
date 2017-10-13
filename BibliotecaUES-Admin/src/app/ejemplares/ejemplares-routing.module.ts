/*
*Nombre del módulo: ejemplares-routing
*Dirección: /src/app/ejemplares/ejemplares-routing.module.ts
*Objetivo: Definición de la rutas del módulo de ejemplares (canActivate y data se usan para la seguridad del sitio)
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjemplaresRootComponent, EjemplarComponent, EjemplarNuevoComponent, EjemplarBuscarComponent } from './componentes';
import { AppAuthGuard } from './../login';

const routes: Routes = [
  {
    path: 'ejemplares',
    component: EjemplaresRootComponent,
    children: [
      {
        path: '',
        component: EjemplarBuscarComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      },
      {
        path: 'nuevo',
        component: EjemplarNuevoComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 113}
      },
      {
        path: ':id',
        component: EjemplarComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class EjemplaresRoutingModule { }
