/*
*Nombre del componente: login
*Dirección: /src/app/login/componentes/login.component.ts
*Objetivo: permite al usuario iniciar sesión.
*/

import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../servicios';

declare const gapi: any;

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit {
  returnUrl: string;
  errorMessage: string;
  message: string;

  auth2: any;
  token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Recuperar la siguiente vista
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/sugerencias';
  }

  ngAfterViewInit() {
    // Inicializar el botón de logueo de google.
    this.googleInit();
  }

  //Método: logueo
  //Objetivo: Permite al usuario loguearse.
  logueo() {
    this.errorMessage = null;
    this.message = "Confirmando cuenta...";
    this.cd.detectChanges();

    // Consumir el servicio de logueo
    this.authService.logueo(this.token).subscribe(
      r => {
        sessionStorage.setItem('token', r['token']);
        sessionStorage.setItem('usuario', JSON.stringify(r['usuario']));
        window.location.href = '.' + this.returnUrl;
      },
      error => {
        this.errorMessage = "El correo ingresado no es del dominio de la Universidad de El Salvador";
        this.message = null;
        this.cd.detectChanges();
      }
    );
  }

  //Método: googleInit
  //Objetivo: Inicializar la interfaz de Google
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: "119678183271-slva4uq0ampcmauaa4926fp64hucln2a.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
        prompt: 'select_account',
        scope: 'profile email'
      });

      // Asignar el método a un componente.
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  //Método: attachSignin
  //Objetivo: Asignar el logueo de Google a un componente.
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      this.token = googleUser.getAuthResponse().id_token + "";

      sessionStorage.setItem('gToken', this.token);
      this.logueo();
    });
  }
}
