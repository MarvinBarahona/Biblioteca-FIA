/*
*Nombre del módulo: consultas-routing
*Dirección física: src/app/consultas/consultas-routing.module.ts
*Objetivo: Definir las rutas del módulo consultas
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultasRootComponent, EjemplarBuscarComponent, EjemplarComponent, LibroComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'consultas',
    component: ConsultasRootComponent,
    children: [
      {
        path: '',
        component: EjemplarBuscarComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      },
      {
        path: 'ejemplar/:id',
        component: EjemplarComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      },
	  {
        path: 'libro/:id',
        component: LibroComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 142}
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class ConsultasRoutingModule { }
