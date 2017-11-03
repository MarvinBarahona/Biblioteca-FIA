/*
*Nombre del módulo: app
*Dirección: /src/app/app.module.ts
*Objetivo: Definición del módulo principal.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LibrosModule } from './libros/libros.module';
import { EjemplaresModule } from './ejemplares/ejemplares.module';
import { AdquisicionesModule } from './adquisiciones/adquisiciones.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { IntercambiosModule } from './intercambios/intercambios.module';
import { PercancesModule } from './percances/percances.module';
import { SugerenciasModule } from './sugerencias/sugerencias.module';
import { LoginModule } from './login';

@NgModule({
  imports: [
    BrowserModule,
    MaterializeModule,
    DataTablesModule,
    Angular2FontawesomeModule,
    CookieModule.forRoot(),
    LoginModule,
    LibrosModule,
    EjemplaresModule,
    AdquisicionesModule,
    EmpleadosModule,
    IntercambiosModule,
    PercancesModule,
    SugerenciasModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
