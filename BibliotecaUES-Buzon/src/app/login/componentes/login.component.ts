/*
*Nombre del módulo: iniciar sesión.
*Dirección: /src/app/login/componentes/login.component.ts
*Objetivo: permite al usuario iniciar sesión.
*/

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie';
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
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/ejemplares';
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  logueo() {

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: "119678183271-slva4uq0ampcmauaa4926fp64hucln2a.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
        prompt: 'select_account',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      this.token = googleUser.getAuthResponse().id_token + "";

      //YOUR CODE HERE
      this.errorMessage = undefined;
      this.message = "Iniciando sesión...";
      console.log(this.token);

    }, (error) => {
      // alert(JSON.stringify(error, undefined, 2));
    });
  }
}
