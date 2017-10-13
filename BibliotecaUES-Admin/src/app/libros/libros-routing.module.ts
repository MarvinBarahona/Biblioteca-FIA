/*
*Nombre del módulo: libros-routing
*Dirección: /src/app/libros/libros-routing.module.ts
*Objetivo: Definir las rutas del módulo de libros (canActivate y data usados para la seguridad del sitio)
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosRootComponent, LibroComponent, LibrosComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'libros',
    component: LibrosRootComponent,
    children: [
      {
        path: '',
        component: LibrosComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 142}
      },
      {
        path: ':id',
        component: LibroComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 142}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class LibrosRoutingModule { }
