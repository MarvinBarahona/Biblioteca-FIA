/*
*Nombre del módulo: intercambios
*Dirección: /src/app/intercambios/intercambios.module.ts
*Objetivo: Definición del módulo de intercambios
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { IntercambiosRoutingModule } from './intercambios-routing.module';
import { IntercambiosRootComponent, IntercambiosComponent, SalidaComponent, EntradaComponent, IntercambioNuevoComponent, EntradaPendienteComponent } from './componentes/';
import { IntercambiosService, EjemplaresService } from './servicios/';

import { LibroSeleccionModule } from './../libro-seleccion';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    CookieModule.forChild(),
    IntercambiosRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [
    IntercambiosRootComponent,
    IntercambiosComponent,
    SalidaComponent,
    EntradaComponent,
    IntercambioNuevoComponent,
    EntradaPendienteComponent
  ],
  providers: [IntercambiosService, EjemplaresService]
})
export class IntercambiosModule { }
