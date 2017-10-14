/*
*Nombre del módulo: trasladar-routing
*Dirección física: src/app/trasladar/trasladar-routing.module.ts
*Objetivo: Definir las rutas del módulo trasladar
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasladarComponent } from './trasladar.component';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'trasladar',
    component: TrasladarComponent,
    canActivate: [AppAuthGuard],
    data: { politica: 143 }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})

export class TrasladarRoutingModule { }
