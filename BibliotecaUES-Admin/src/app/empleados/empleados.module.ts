import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosRootComponent, EmpleadosComponent, EmpleadoComponent, EmpleadoNuevoComponent } from './componentes/';
import { EmpleadosService, GruposService } from './servicios/';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    DataTablesModule,
    CookieModule.forChild(),
    EmpleadosRoutingModule
  ],
  declarations: [
    EmpleadosRootComponent,
    EmpleadosComponent,
    EmpleadoComponent,
    EmpleadoNuevoComponent
  ],
  providers: [EmpleadosService, GruposService]
})
export class EmpleadosModule { }
