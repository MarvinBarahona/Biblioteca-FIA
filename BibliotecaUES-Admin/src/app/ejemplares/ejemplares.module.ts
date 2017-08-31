import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { EjemplaresRoutingModule } from './ejemplares-routing.module';
import { EjemplaresRootComponent, EjemplarBuscarComponent, EjemplarComponent, EjemplarNuevoComponent } from './componentes';
import { EjemplaresService } from './servicios';

import { LibroSeleccionModule } from './../libro-seleccion';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CookieModule.forChild(),
    EjemplaresRoutingModule,
    LibroSeleccionModule
  ],
  declarations: [
    EjemplaresRootComponent,
    EjemplarBuscarComponent,
    EjemplarComponent,
    EjemplarNuevoComponent
  ],
  providers: [
    EjemplaresService
  ]
})
export class EjemplaresModule { }
