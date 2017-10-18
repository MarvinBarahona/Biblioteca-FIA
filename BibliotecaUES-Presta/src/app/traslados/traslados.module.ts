/*
*Nombre del módulo: traslados
*Dirección física: src/app/traslados/traslados.module.ts
*Objetivo: Definir el módulo traslados
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { TrasladosRoutingModule } from './traslados-routing.module';
import { TrasladosComponent } from './traslados.component';
import { EjemplaresService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    TrasladosRoutingModule,
    CookieModule.forChild()
  ],
  declarations: [
    TrasladosComponent
  ],
  providers: [
    EjemplaresService
  ]
})
export class TrasladosModule { }
