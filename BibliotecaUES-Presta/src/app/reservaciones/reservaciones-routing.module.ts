/*
*Nombre del módulo: reservaciones-routing
*Dirección física: src/app/reservaciones/reservaciones-routing.module.ts
*Objetivo: Definir las rutas del módulo reservaciones
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservacionesComponent } from './reservaciones.component';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'reservaciones',
    component: ReservacionesComponent,
    canActivate: [AppAuthGuard],
    data: { politica: 215 }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class ReservacionesRoutingModule { }
