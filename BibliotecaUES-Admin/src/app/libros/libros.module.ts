import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { LibrosRoutingModule } from './libros-routing.module';
import { LibrosRootComponent, LibrosComponent, LibroComponent, CatalogarComponent, CatalogadoComponent } from './componentes';
import { LibrosService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    CookieModule.forChild(),
    LibrosRoutingModule
  ],
  declarations: [
    LibrosRootComponent,
    LibrosComponent,
    LibroComponent,
    CatalogarComponent,
    CatalogadoComponent
  ],
  providers: [
    LibrosService
  ]
})
export class LibrosModule { }
