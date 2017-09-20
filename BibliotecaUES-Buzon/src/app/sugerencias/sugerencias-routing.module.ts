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
        path: ':id',
        component: SugerenciaComponent
      },
      {
        path: 'nueva',
        component: SugerenciaNuevaComponent
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
