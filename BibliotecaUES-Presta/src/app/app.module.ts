/*
*Nombre del módulo: app
*Dirección física: src/app/app.module.ts
*Objetivo: Módulo principal
**/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ConsultarModule } from './consultar/consultar.module';
import { TrasladarModule } from './trasladar/trasladar.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { LoginModule } from './login';

@NgModule({
  imports: [
    BrowserModule,
    MaterializeModule,
    DataTablesModule,
    Angular2FontawesomeModule,
    CookieModule.forRoot(),
    LoginModule,
    ConsultarModule,
    TrasladarModule,
    PrestamosModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
