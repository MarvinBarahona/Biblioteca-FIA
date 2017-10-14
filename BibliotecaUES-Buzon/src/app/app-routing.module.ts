/*
*Nombre del módulo: app-routing
*Dirección física: src/app/app-routing.module.ts
*Objetivo: Declarar las rutas generales del sitio
**/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sugerencias',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
