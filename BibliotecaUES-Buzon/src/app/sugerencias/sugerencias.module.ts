/*
*Nombre del módulo: sugerencias
*Dirección física: src/app/sugerencias/sugerencias.module.ts
*Objetivo: Declarar el módulo de sugerencias
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { SugerenciasRoutingModule } from './sugerencias-routing.module';
import { SugerenciasRootComponent, SugerenciasComponent, VotarComponent,
         SugerenciaNuevaEstudianteComponent, SugerenciaNuevaDocenteComponent,
         MisSugerenciasComponent, PedidoComponent
       } from './componentes';
import { SugerenciasService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,
    MaterializeModule,
    SugerenciasRoutingModule
  ],
  declarations: [
    SugerenciasRootComponent,
    SugerenciasComponent,
    VotarComponent,
    SugerenciaNuevaEstudianteComponent,
    SugerenciaNuevaDocenteComponent,
    MisSugerenciasComponent,
    PedidoComponent
  ],
  providers: [
    SugerenciasService
  ]
})
export class SugerenciasModule { }
