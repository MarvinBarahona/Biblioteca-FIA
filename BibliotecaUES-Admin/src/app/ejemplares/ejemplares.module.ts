import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjemplaresRoutingModule } from './ejemplares-routing.module';
import { LibroSeleccionModule } from './../libro-seleccion/libro-seleccion.module';
import { EjemplaresRootComponent } from './ejemplares-root.component';
import { EjemplaresComponent } from './componentes/ejemplares.component';
import { EjemplarComponent } from './componentes/ejemplar.component';
import { EjemplarNuevoComponent } from './componentes/ejemplar-nuevo.component';

@NgModule({
  imports: [
    CommonModule,
    EjemplaresRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [EjemplaresRootComponent, EjemplaresComponent, EjemplarComponent, EjemplarNuevoComponent]
})
export class EjemplaresModule { }
