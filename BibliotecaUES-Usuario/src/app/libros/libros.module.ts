import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { LibrosRoutingModule } from './libros-routing.module';
import { LibrosRootComponent, LibrosNuevosComponent, LibrosBuscarComponent, LibroComponent } from './componentes';
import { LibrosService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    DataTablesModule,
    MaterializeModule,
    CookieModule.forChild(),
    LibrosRoutingModule
  ],
  declarations: [
    LibrosRootComponent,
    LibrosNuevosComponent,
    LibrosBuscarComponent,
    LibroComponent
  ],
  providers: [
    LibrosService
  ]
})
export class LibrosModule { }
