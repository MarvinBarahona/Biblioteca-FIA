import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjemplaresRoutingModule } from './ejemplares-routing.module';
import { EjemplaresRootComponent } from './ejemplares-root.component';
import { EjemplaresComponent, EjemplarComponent, EjemplarNuevoComponent } from './componentes';

import { LibroSeleccionModule } from './../libro-seleccion/libro-seleccion.module';

@NgModule({
  imports: [
    CommonModule,
    EjemplaresRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [EjemplaresRootComponent, EjemplaresComponent, EjemplarComponent, EjemplarNuevoComponent]
})
export class EjemplaresModule { }
