/*
*Nombre del módulo: login
*Dirección física: src/app/login/login.module.ts
*Objetivo: Declarar el módulo de login
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent, NotAllowedComponent, NotFoundComponent } from './componentes';
import { AuthService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    NotFoundComponent,
    NotAllowedComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
