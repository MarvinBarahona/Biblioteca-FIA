/*
*Nombre del módulo: prestamos
*Dirección física: src/app/prestamos/prestamos.module.ts
*Objetivo: Definir el módulo prestamos
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { PrestamosRoutingModule } from './prestamos-routing.module';
import { PrestamosComponent } from './prestamos.component';
// import {  } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    CookieModule.forChild(),
    PrestamosRoutingModule
  ],
  declarations: [
    PrestamosComponent
  ],
  providers: [
  ]
})
export class PrestamosModule { }
