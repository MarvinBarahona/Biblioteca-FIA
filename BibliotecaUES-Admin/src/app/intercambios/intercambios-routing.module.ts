import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntercambiosRootComponent, IntercambiosComponent, IntercambioComponent, IntercambioNuevoComponent, EntradaPendienteComponent } from './componentes/';
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
        path: ':id',
        component: IntercambioComponent,
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
