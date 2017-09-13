/*
*Nombre del módulo: iniciar sesión. 
*Dirección: /src/app/login/componentes/login.component.ts
*Objetivo: permite al usuario iniciar sesión.
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { AuthService } from './../servicios';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  errorMessage: string;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/consultar';
  }

  logueo() {
    this.errorMessage = undefined;
    this.message = "Iniciando sesión..."

    this.authService.logueo(this.model.correo, this.model.contra).subscribe(
      r => {
        this.cookieService.put('token', r['token']);
        this.cookieService.putObject('usuario', r['usuario']);
        window.location.href = '.' + this.returnUrl;
      },
      error => {
        this.message = undefined;
        if (error.status === 404) {
          this.errorMessage = "Usuario no encontrado"
        }
        if (error.status === 401) {
          this.errorMessage = "Contraseña incorrecta"
        }
      }
    );
  }
}
