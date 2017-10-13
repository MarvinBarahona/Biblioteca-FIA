/*
*Nombre del módulo: intercambios-routing
*Dirección: /src/app/intercambios/intercambios-routing.module.ts
*Objetivo: Definir las rutas del módulo de intercambios (canActivate y data usados para la seguridad del sitio)
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntercambiosRootComponent, IntercambiosComponent, SalidaComponent, EntradaComponent, IntercambioNuevoComponent, EntradaPendienteComponent } from './componentes/';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'intercambios',
    component: IntercambiosRootComponent,
    children: [
      {
        path: '',
        component: IntercambiosComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      },
      {
        path: 'nuevo',
        component: IntercambioNuevoComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 114}
      },
      {
        path: 'pendiente',
        component: EntradaPendienteComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 114}
      },
      {
        path: 'salida/:id',
        component: SalidaComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      },
      {
        path: 'entrada/:id',
        component: EntradaComponent,
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
export class IntercambiosRoutingModule { }
