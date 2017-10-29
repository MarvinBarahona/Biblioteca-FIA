/*
*Nombre del módulo: prestamos-routing
*Dirección física: src/app/prestamos/prestamos-routing.module.ts
*Objetivo: Definir las rutas del módulo prestamos
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestamosComponent } from './prestamos.component';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'prestamos',
    component: PrestamosComponent,
    canActivate: [AppAuthGuard],
    data: { politica: 215 }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class PrestamosRoutingModule { }
