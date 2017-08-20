import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdquisicionesRoutingModule } from './adquisiciones-routing.module';
import { AdquisicionesRootComponent } from './adquisiciones-root.component';
import { AdquisicionesComponent, AdquisicionComponent, AdquisicionNuevaComponent } from './componentes/';

import { LibroSeleccionModule } from './../libro-seleccion/libro-seleccion.module';

@NgModule({
  imports: [
    CommonModule,
    AdquisicionesRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [AdquisicionesRootComponent, AdquisicionesComponent, AdquisicionComponent, AdquisicionNuevaComponent]
})
export class AdquisicionesModule { }
