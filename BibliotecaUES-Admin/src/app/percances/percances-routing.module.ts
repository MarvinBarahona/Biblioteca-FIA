/*
*Nombre del módulo: percances-routing
*Dirección física: src/app/percances/percances-routing.module.ts
*Objetivo: Definir las rutas del módulo percances
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PercancesRootComponent, PercancesComponent } from './componentes';
import { AppAuthGuard } from './../login';

const routes: Routes = [
  {
    path: 'percances',
    component: PercancesRootComponent,
    children: [
      {
        path: '',
        component: PercancesComponent,
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
export class PercancesRoutingModule { }
