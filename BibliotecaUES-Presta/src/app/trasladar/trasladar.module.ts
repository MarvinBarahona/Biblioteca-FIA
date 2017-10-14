/*
*Nombre del módulo: trasladar
*Dirección física: src/app/trasladar/trasladar.module.ts
*Objetivo: Definir el módulo trasladar
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { TrasladarRoutingModule } from './trasladar-routing.module';
import { TrasladarComponent } from './trasladar.component';
import { EjemplaresService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    TrasladarRoutingModule,
    CookieModule.forChild()
  ],
  declarations: [
    TrasladarComponent
  ],
  providers: [
    EjemplaresService
  ]
})
export class TrasladarModule { }
