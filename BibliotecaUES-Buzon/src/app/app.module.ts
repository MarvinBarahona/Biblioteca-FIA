import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SugerenciasModule } from './sugerencias/sugerencias.module';

@NgModule({
  imports: [
    BrowserModule,
    MaterializeModule,
    DataTablesModule,
    Angular2FontawesomeModule,
    CookieModule.forRoot(),
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
