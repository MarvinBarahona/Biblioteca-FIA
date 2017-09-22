import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciasRootComponent, SugerenciaComponent, SugerenciaNuevaEstudianteComponent, SugerenciaNuevaDocenteComponent, SugerenciasComponent } from './componentes';

const routes: Routes = [
  {
    path: 'sugerencias',
    component: SugerenciasRootComponent,
    children: [
      {
        path: '',
        component: SugerenciasComponent
      },
      {
        path: 'nueva/estudiante',
        component: SugerenciaNuevaEstudianteComponent
      },
      {
        path: 'nueva/docente',
        component: SugerenciaNuevaDocenteComponent
      },
      {
        path: ':id',
        component: SugerenciaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SugerenciasRoutingModule { }
