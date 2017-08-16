import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroNuevoComponent } from './componentes/libro-nuevo.component';
import { LibroBuscarComponent } from './componentes/libro-buscar.component';
import { LibroSeleccionComponent } from './libro-seleccion.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LibroNuevoComponent, LibroBuscarComponent, LibroSeleccionComponent],
  exports: [LibroSeleccionComponent]
})
export class LibroSeleccionModule { }
