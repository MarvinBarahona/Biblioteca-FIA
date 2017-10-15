/*
*Nombre del módulo: reservaciones
*Dirección física: src/app/reservaciones/reservaciones.module.ts
*Objetivo: Definir el módulo reservaciones
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { ReservacionesRoutingModule } from './reservaciones-routing.module';
import { ReservacionesComponent } from './reservaciones.component';
// import {  } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    CookieModule.forChild(),
    ReservacionesRoutingModule
  ],
  declarations: [
    ReservacionesComponent
  ],
  providers: [
  ]
})
export class ReservacionesModule { }