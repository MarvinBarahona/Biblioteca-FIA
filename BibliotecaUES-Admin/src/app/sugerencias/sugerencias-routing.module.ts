/*
*Nombre del módulo: sugerencias-routing
*Dirección física: src/app/sugerencias-routing /sugerencias-routing .module.ts
*Objetivo: Definir las rutas del módulo sugerencias (canActivate y data usados para la seguridad del sitio)
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciasRootComponent, SugerenciasComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'sugerencias',
    component: SugerenciasRootComponent,
    children: [
      {
        path: '',
        component: SugerenciasComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}//Cambiar a politica 400 de momento no existe
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class SugerenciasRoutingModule { }
