import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { AdquisicionesRoutingModule } from './adquisiciones-routing.module';
import { AdquisicionesRootComponent, AdquisicionesComponent, AdquisicionComponent, AdquisicionNuevaComponent } from './componentes/';
import { AdquisicionesService } from './servicios';

import { LibroSeleccionModule } from './../libro-seleccion';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CookieModule.forChild(),
    AdquisicionesRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [
    AdquisicionesRootComponent,
    AdquisicionesComponent,
    AdquisicionComponent,
    AdquisicionNuevaComponent
  ],
  providers: [
    AdquisicionesService
  ]
})
export class AdquisicionesModule { }
