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

import { LoginComponent, NotFoundComponent, NotAllowedComponent, AppAuthGuard, SkipLoginGuard } from './login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    NotAllowedComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    DataTablesModule,
    Angular2FontawesomeModule,
    CookieModule.forRoot(),
    AdquisicionesModule,
    LibrosModule,
    EjemplaresModule,
    AppRoutingModule
  ],
  providers: [AppAuthGuard, SkipLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
