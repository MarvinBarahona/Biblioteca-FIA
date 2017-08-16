import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LibrosRoutingModule } from './libros/libros-routing.module';
import { EjemplaresRoutingModule } from './ejemplares/ejemplares-routing.module';
import { AdquisicionesRoutingModule } from './adquisiciones/adquisiciones-routing.module';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './guards/not-found.component';
import { NotAllowedComponent } from './guards/not-allowed.component';

import { AppAuthGuard } from './guards/app-auth.guard';
import { SkipLoginGuard } from './guards/skip-login.guard';

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
    AppRoutingModule,
    LibrosRoutingModule,
    EjemplaresRoutingModule,
    AdquisicionesRoutingModule
  ],
  providers: [AppAuthGuard, SkipLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
