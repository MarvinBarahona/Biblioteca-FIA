/*
*Nombre del módulo: app-routing
*Dirección: /src/app/app-routing.component.ts
*Objetivo: Definición de las rutas principales

Define:
  *El componente inicial del sitio
  *El componente a mostrar cuando no hay coincidencia en la ruta buscada.
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/ejemplares',
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
