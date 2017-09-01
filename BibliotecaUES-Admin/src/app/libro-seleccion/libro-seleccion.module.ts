import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { MaterializeModule } from 'angular2-materialize';

import { LibroSeleccionComponent, LibroNuevoComponent, LibroBuscarComponent } from './componentes';
import { LibroSeleccionService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    CookieModule.forChild()
  ],
  declarations: [
    LibroNuevoComponent,
    LibroBuscarComponent,
    LibroSeleccionComponent
  ],
  exports:[
    LibroSeleccionComponent
  ],
  providers: [
    LibroSeleccionService
  ]
})
export class LibroSeleccionModule { }
