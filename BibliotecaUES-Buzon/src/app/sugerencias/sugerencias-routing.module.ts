import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciasRootComponent, SugerenciaComponent, SugerenciaNuevaComponent, SugerenciasComponent } from './componentes';

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
        path: 'nueva',
        component: SugerenciaNuevaComponent
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
