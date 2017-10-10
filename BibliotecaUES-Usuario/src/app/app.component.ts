import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, Usuario } from './login/servicios/';

declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  usuario: Usuario;
  auth2: any;
  token: string;

  constructor(private router: Router, private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.googleInit();
  }

  cerrarSesion() {
    sessionStorage.clear();
    location.reload();
  }

  ngOnInit() {
    let u = JSON.parse(sessionStorage.getItem('usuario'));
    if (u) this.usuario = u;
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

      sessionStorage.setItem('gToken', this.token);
      this.logueo();
    });
  }

  logueo() {
    this.authService.logueo(this.token).subscribe(
      r => {
        let usuario = r['usuario'];
        sessionStorage.setItem('token', r['token']);
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        location.reload();
      },
      error => {
        // this.errorMessage = "El correo ingresado no es del dominio de la Universidad de El Salvador";
        // this.message = null;
        // this.cd.detectChanges();
      }
    );
  }
}
