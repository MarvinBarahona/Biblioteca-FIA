/*
*Nombre del módulo: descartes
*Dirección física: src/app/descartes/descartes.module.ts
*Objetivo: Definir el módulo descartes
**/

import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { DescartesRoutingModule } from './descartes-routing.module';
import { DescartesRootComponent, DescartesComponent, DescarteNuevoComponent } from './componentes/';
// import { DescartesService } from './servicios';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    CookieModule.forChild(),
    DescartesRoutingModule
  ],
  declarations: [
    DescartesRootComponent,
    DescartesComponent,
    DescarteNuevoComponent
  ],
  providers: [
    // DescartesService
  ]
})
export class DescartesModule { }
