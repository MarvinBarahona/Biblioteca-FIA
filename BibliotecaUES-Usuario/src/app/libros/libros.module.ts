/*
*Nombre del módulo: libros
*Dirección física: src/app/libros/libros.module.ts
*Objetivo: Definir el módulo libros
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { LibrosRoutingModule } from './libros-routing.module';
import { LibrosRootComponent, LibrosComponent, LibroComponent } from './componentes';
import { LibrosService, ReservacionesService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    DataTablesModule,
    MaterializeModule,
    CookieModule.forChild(),
    LibrosRoutingModule
  ],
  declarations: [
    LibrosRootComponent,
    LibrosComponent,
    LibroComponent
  ],
  providers: [
    LibrosService,
    ReservacionesService
  ]
})
export class LibrosModule { }
