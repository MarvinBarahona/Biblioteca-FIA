/*
*Nombre del módulo: login-routing
*Dirección: /src/app/login/login-routing.module.ts
*Objetivo: Definir las rutas del módulo de login
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, NotAllowedComponent, NotFoundComponent, PerfilComponent, RestaurarContraComponent, CambiarContraComponent } from './componentes';
import { SkipLoginGuard } from './guards';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ SkipLoginGuard ]
  },
  {
    path: 'error403',
    component: NotAllowedComponent
  },
  {
    path: 'error404',
    component: NotFoundComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'cambiar/:id/:token',
    component: CambiarContraComponent
  },
  {
    path: 'restaurar',
    component: RestaurarContraComponent
  },
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
