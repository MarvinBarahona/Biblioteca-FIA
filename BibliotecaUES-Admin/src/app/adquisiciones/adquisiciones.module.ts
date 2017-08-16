import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdquisicionesRoutingModule } from './adquisiciones-routing.module';
import { LibroSeleccionModule } from './../libro-seleccion/libro-seleccion.module';
import { AdquisicionesRootComponent } from './adquisiciones-root.component';
import { AdquisicionesComponent } from './componentes/adquisiciones.component';
import { AdquisicionComponent } from './componentes/adquisicion.component';
import { AdquisicionNuevaComponent } from './componentes/adquisicion-nueva.component';

@NgModule({
  imports: [
    CommonModule,
    AdquisicionesRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [AdquisicionesRootComponent, AdquisicionesComponent, AdquisicionComponent, AdquisicionNuevaComponent]
})
export class AdquisicionesModule { }
