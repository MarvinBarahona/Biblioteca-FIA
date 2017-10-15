import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestamosRootComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'prestamos',
    component: PrestamosRootComponent,
    children: [
      {
        path: '',
        // component: 
        // canActivate: [AppAuthGuard],
        // data: {politica: 143}
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class PrestamosRoutingModule { }
