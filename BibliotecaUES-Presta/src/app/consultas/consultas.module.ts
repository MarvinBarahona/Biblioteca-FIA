/*
*Nombre del módulo: consultas
*Dirección física: src/app/consultas/consultas.module.ts
*Objetivo: Definir el módulo consultas
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasRootComponent, EjemplarBuscarComponent, EjemplarComponent, LibroComponent } from './componentes';
import { EjemplaresService, LibrosService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    CookieModule.forChild(),
    ConsultasRoutingModule
  ],
  declarations: [
    ConsultasRootComponent,
    EjemplarBuscarComponent,
    EjemplarComponent,
	  LibroComponent
  ],
  providers: [
    EjemplaresService,
	  LibrosService
  ]
})
export class ConsultasModule { }
