/*
*Nombre del módulo: libro-seleccion
*Dirección: /src/app/libro-seleccion/libro-seleccion.module.ts
*Objetivo: Definición del módulo de libro-seleccion
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { DataTablesModule } from 'angular-datatables';
import { MaterializeModule } from 'angular2-materialize';

import { LibroSeleccionComponent, LibroNuevoComponent, LibroBuscarComponent } from './componentes';
import { LibroSeleccionService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    DataTablesModule,
    MaterializeModule,
    CookieModule.forChild()
  ],
  declarations: [
    LibroNuevoComponent,
    LibroBuscarComponent,
    LibroSeleccionComponent
  ],
  exports:[
    LibroSeleccionComponent
  ],
  providers: [
    LibroSeleccionService
  ]
})
export class LibroSeleccionModule { }
