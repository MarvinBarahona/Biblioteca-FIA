import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdquisicionesRootComponent, AdquisicionComponent, AdquisicionNuevaComponent, AdquisicionesComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'adquisiciones',
    component: AdquisicionesRootComponent,
    children: [
      {
        path: '',
        component: AdquisicionesComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 143}
      },
      {
        path: 'nueva',
        component: AdquisicionNuevaComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 113}
      },
      {
        path: ':id',
        component: AdquisicionComponent,
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
export class AdquisicionesRoutingModule { }
