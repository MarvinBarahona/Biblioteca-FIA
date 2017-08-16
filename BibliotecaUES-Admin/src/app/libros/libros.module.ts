import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';
import { LibrosRootComponent } from './libros-root.component';
import { LibrosComponent } from './componentes/libros.component';
import { LibroComponent } from './componentes/libro.component';

@NgModule({
  imports: [
    CommonModule,
    LibrosRoutingModule
  ],
  declarations: [LibrosRootComponent, LibrosComponent, LibroComponent]
})
export class LibrosModule { }
