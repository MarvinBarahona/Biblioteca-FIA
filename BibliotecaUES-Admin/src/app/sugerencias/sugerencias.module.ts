/*
*Nombre del módulo: sugerencias
*Dirección física: src/app/sugerencias/sugerencias.module.ts
*Objetivo: Definir el módulo sugerencias
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { PdfmakeModule } from 'ng-pdf-make';

import { SugerenciasRoutingModule } from './sugerencias-routing.module';
import { SugerenciasRootComponent, SugerenciasComponent, SugerenciaComponent } from './componentes';
import { SugerenciasService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    DataTablesModule,
    MaterializeModule,
    CookieModule.forChild(),
    PdfmakeModule,
    SugerenciasRoutingModule
  ],
  declarations: [
    SugerenciasRootComponent,
    SugerenciasComponent,
    SugerenciaComponent
  ],
  providers: [
    SugerenciasService
  ]
})
export class SugerenciasModule { }
