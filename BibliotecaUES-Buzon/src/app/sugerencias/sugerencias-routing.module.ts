import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAuthGuard } from './../login/';
import { SugerenciasRootComponent, SugerenciaComponent, SugerenciaNuevaEstudianteComponent, SugerenciaNuevaDocenteComponent, SugerenciasComponent } from './componentes';

const routes: Routes = [
  {
    path: 'sugerencias',
    component: SugerenciasRootComponent,
    children: [
      {
        path: '',
        component: SugerenciasComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 400}
      },
      {
        path: 'nueva/estudiante',
        component: SugerenciaNuevaEstudianteComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 410}
      },
      {
        path: 'nueva/docente',
        component: SugerenciaNuevaDocenteComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 420}
      },
      {
        path: 'votar/:id',
        component: SugerenciaComponent,
        canActivate: [AppAuthGuard],
        data: {politica: 420}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class SugerenciasRoutingModule { }
