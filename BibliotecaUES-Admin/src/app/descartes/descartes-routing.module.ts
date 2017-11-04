/*
*Nombre del módulo: descartes-routing
*Dirección física: src/app/descartes/descartes-routing.module.ts
*Objetivo: Definir las rutas del módulo descartes
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescartesRootComponent, DescartesComponent, DescarteNuevoComponent, DescarteComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'descartes',
    component: DescartesRootComponent,
    children: [
      {
        path: '',
        component: DescartesComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      },
      {
        path: 'nuevo',
        component: DescarteNuevoComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 114}
      },
      {
        path: ':id',
        component: DescarteComponent,
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
export class DescartesRoutingModule { }
