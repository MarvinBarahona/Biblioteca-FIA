import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjemplaresRootComponent, EjemplarBuscarComponent, EjemplarComponent, LibroComponent } from './componentes';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'consultar',
    component: EjemplaresRootComponent,
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
export class ConsultarRoutingModule { }
