import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosRootComponent, EmpleadosComponent, EmpleadoComponent, EmpleadoNuevoComponent } from './componentes/';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'empleados',
    component: EmpleadosRootComponent,
    children: [
      {
        path: '',
        component: EmpleadosComponent,
        //canActivate: [AppAuthGuard],
        data: {politica: 101}
      },
      {
        path: 'nuevo',
        component: EmpleadoNuevoComponent,
        //canActivate: [AppAuthGuard],
        data: {politica: 101}
      },
      {
        path: ':id',
        component: EmpleadoComponent,
        //canActivate: [AppAuthGuard],
        data: {politica: 101}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class EmpleadosRoutingModule { }
