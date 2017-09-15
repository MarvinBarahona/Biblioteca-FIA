import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieModule } from 'ngx-cookie';
import { MaterializeModule } from 'angular2-materialize';

import { TrasladarComponent } from './trasladar.component';

import { EjemplaresService } from './ejemplares.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MaterializeModule,
    CookieModule.forChild()
  ],
  declarations: [
    TrasladarComponent
  ],
  providers: [
    EjemplaresService
  ]
})
export class TrasladarModule { }
