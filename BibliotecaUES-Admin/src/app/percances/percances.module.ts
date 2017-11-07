/*
*Nombre del módulo: percances
*Dirección: /src/app/percances/percances.module.ts
*Objetivo: Deifición del módulo de percances.
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { PercancesRoutingModule } from './percances-routing.module';
import { PercancesComponent } from './percances.component';
import { PercancesService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    CookieModule.forChild(),
    PercancesRoutingModule
  ],
  declarations: [
    PercancesComponent
  ],
  providers: [
    PercancesService
  ]
})
export class PercancesModule { }
