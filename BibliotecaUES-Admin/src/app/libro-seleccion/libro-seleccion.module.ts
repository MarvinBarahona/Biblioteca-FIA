import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { LibroSeleccionComponent, LibroNuevoComponent, LibroBuscarComponent } from './componentes';
import { LibroSeleccionService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
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
