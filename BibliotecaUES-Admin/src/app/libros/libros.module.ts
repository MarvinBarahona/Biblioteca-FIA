import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { LibrosRoutingModule } from './libros-routing.module';
import { LibrosRootComponent, LibrosComponent, LibroComponent } from './componentes';
import { LibrosService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CookieModule.forChild(),
    LibrosRoutingModule
  ],
  declarations: [
    LibrosRootComponent,
    LibrosComponent,
    LibroComponent
  ],
  providers: [
    LibrosService
  ]
})
export class LibrosModule { }
