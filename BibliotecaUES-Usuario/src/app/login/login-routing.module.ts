/*
*Nombre del módulo: login-routing
*Dirección: /src/app/login/login-routing.module.ts
*Objetivo: Definir las rutas del módulo de login
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAllowedComponent, NotFoundComponent } from './componentes';

const appRoutes: Routes = [
  {
    path: 'error403',
    component: NotAllowedComponent
  },
  {
    path: 'error404',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class LoginRoutingModule { }
