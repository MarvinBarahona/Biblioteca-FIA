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
        data: {politica: "catalogar"}
      },
      {
        path: ':id',
        component: LibroComponent,
        canActivate: [AppAuthGuard],
        data: {politica: "catalogar"}
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
