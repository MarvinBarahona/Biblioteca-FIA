import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { EjemplaresRoutingModule } from './consultar-routing.module';
import { EjemplaresRootComponent, EjemplarBuscarComponent, EjemplarComponent, LibroComponent } from './componentes';
import { EjemplaresService, LibrosService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    CookieModule.forChild(),
    ConsultarRoutingModule
  ],
  declarations: [
    EjemplaresRootComponent,
    EjemplarBuscarComponent,
    EjemplarComponent,
	LibroComponent
  ],
  providers: [
    EjemplaresService,
	LibrosService
  ]
})
export class ConsultarModule { }