/*
*Nombre del módulo: info-routing
*Dirección física: src/app/info/info-routing.module.ts
*Objetivo: Declarar las rutas del módulo de info
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAuthGuard } from './../login/';
import { InfoRootComponent } from './componentes';

const routes: Routes = [
  {
    path: 'info',
    component: InfoRootComponent,
    canActivate: [AppAuthGuard],
    data: {politica: 400}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class InfoRoutingModule { }
