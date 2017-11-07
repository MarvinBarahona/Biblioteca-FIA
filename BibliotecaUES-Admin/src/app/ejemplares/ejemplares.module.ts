/*
*Nombre del módulo: ejemplares
*Dirección: /src/app/ejemplares/ejemplares.module.ts
*Objetivo: Deifición del módulo de ejemplares.
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { EjemplaresRoutingModule } from './ejemplares-routing.module';
import { EjemplaresRootComponent, EjemplarBuscarComponent, EjemplarComponent, EjemplarNuevoComponent } from './componentes';
import { EjemplaresService, TransaccionesService } from './servicios';

import { LibroSeleccionModule } from './../libro-seleccion';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    CookieModule.forChild(),
    EjemplaresRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [
    EjemplaresRootComponent,
    EjemplarBuscarComponent,
    EjemplarComponent,
    EjemplarNuevoComponent
  ],
  providers: [
    EjemplaresService,
    TransaccionesService
  ]
})
export class EjemplaresModule { }
