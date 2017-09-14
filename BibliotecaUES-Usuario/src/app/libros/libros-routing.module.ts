import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosRootComponent, LibroComponent, LibrosNuevosComponent } from './componentes';

const routes: Routes = [
  {
    path: 'libros',
    component: LibrosRootComponent,
    children: [
      {
        path: '',
        component: LibrosNuevosComponent
      },
      {
        path: 'buscar',
        component: LibrosBuscarComponent
      },
      {
        path: ':id',
        component: LibroComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LibrosRoutingModule { }
