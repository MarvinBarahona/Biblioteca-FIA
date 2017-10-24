/*
*Nombre del módulo: traslados-routing
*Dirección física: src/app/traslados/traslados-routing.module.ts
*Objetivo: Definir las rutas del módulo traslados
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasladosComponent } from './traslados.component';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'traslados',
    component: TrasladosComponent,
    canActivate: [AppAuthGuard],
    data: { politica: 143 }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})

export class TrasladosRoutingModule { }
