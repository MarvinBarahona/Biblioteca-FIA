/*
*Nombre del módulo: sugerencias-routing
*Dirección física: src/app/sugerencias/sugerencias-routing.module.ts
*Objetivo: Declarar las rutas del módulo de sugerencias
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAuthGuard } from './../login/';
import { SugerenciasRootComponent, VotarComponent, SugerenciaNuevaEstudianteComponent,
         SugerenciaNuevaDocenteComponent, SugerenciasComponent, MisSugerenciasComponent,
         PedidoComponent
       } from './componentes';

const routes: Routes = [
  {
    path: 'sugerencias',
    component: SugerenciasRootComponent,
    children: [
      {
        path: '',
        component: SugerenciasComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 400}
      },
      {
        path: 'nueva/estudiante',
        component: SugerenciaNuevaEstudianteComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 410}
      },
      {
        path: 'nueva/docente',
        component: SugerenciaNuevaDocenteComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 420}
      },
      {
        path: 'votar/:id',
        component: VotarComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 410}
      },
      {
        path: 'missugerencias',
        component: MisSugerenciasComponent
        // canActivate: [AppAuthGuard],
        // data: {politica: }
      },
      {
        path: 'pedir/:id',
        component: PedidoComponent
        // canActivate: [AppAuthGuard],
        // data: {politica: }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class SugerenciasRoutingModule { }
