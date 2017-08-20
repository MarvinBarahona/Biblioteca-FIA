import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibroNuevoComponent, LibroBuscarComponent } from './componentes';
import { LibroSeleccionComponent } from './libro-seleccion.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LibroNuevoComponent, LibroBuscarComponent, LibroSeleccionComponent],
  exports: [LibroNuevoComponent, LibroBuscarComponent, LibroSeleccionComponent]
})
export class LibroSeleccionModule { }
