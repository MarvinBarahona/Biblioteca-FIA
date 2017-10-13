/*
*Nombre del módulo: adquisiciones
*Dirección: /src/app/adquisiciones/adquisiciones.module.ts
*Objetivo: Definición del módulo de adquisiciones.
*/

import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { AdquisicionesRoutingModule } from './adquisiciones-routing.module';
import { AdquisicionesRootComponent, AdquisicionesComponent, AdquisicionComponent, AdquisicionNuevaComponent } from './componentes/';
import { AdquisicionesService, EjemplaresService } from './servicios';

import { LibroSeleccionModule } from './../libro-seleccion';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
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
    AdquisicionesService, EjemplaresService
  ]
})
export class AdquisicionesModule { }
