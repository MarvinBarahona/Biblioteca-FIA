/*
*Nombre del módulo: login
*Dirección: /src/app/login/login.module.ts
*Objetivo: Definición del módulo de login
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent, NotAllowedComponent, NotFoundComponent, PerfilComponent, RestaurarContraComponent, CambiarContraComponent } from './componentes';
import { AuthService } from './servicios';
import { SkipLoginGuard } from './guards';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CookieModule.forChild(),
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    NotFoundComponent,
    NotAllowedComponent,
    PerfilComponent,
    RestaurarContraComponent,
    CambiarContraComponent
  ],
  providers: [
    AuthService,
    SkipLoginGuard
  ]
})
export class LoginModule { }
