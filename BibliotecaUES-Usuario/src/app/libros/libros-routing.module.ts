import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosRootComponent, LibroComponent, LibrosComponent, LoginComponent } from './componentes';

const routes: Routes = [
  {
    path: 'libros',
    component: LibrosRootComponent,
    children: [
      {
        path: '',
        component: LibrosComponent
      },
      {
        path: ':id',
        component: LibroComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LibrosRoutingModule { }
