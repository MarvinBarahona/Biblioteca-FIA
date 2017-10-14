/*
*Nombre del componente: app
*Dirección física: src/app/app.component.ts
*Objetivo: Declaración del componente principal
**/

import { Component, AfterViewInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";

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
  messageBtn: string;

  modalErrorActions = new EventEmitter<string | MaterializeAction>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Recuperar los datos del usuario, si existe.
    this.messageBtn = "Iniciar sesión";
    let u = JSON.parse(sessionStorage.getItem('usuario'));
    if (u) this.usuario = u;
  }

  ngAfterViewInit() {
    // Inicializar el login de Google
    this.googleInit();
  }

  //Método: googleInit
  //Objetivo: Iniciar la interfaz de Google
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

  //Método: attachSignin
  //Objetivo: coloca el login de Google en un elemento de la vista.
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      this.token = googleUser.getAuthResponse().id_token + "";

      sessionStorage.setItem('gToken', this.token);
      this.logueo();
    });
  }

  //Método: logueo
  //Objetivo: Permite iniciar sesión
  logueo() {
    this.messageBtn = "Iniciando sesión...";
    this.cd.detectChanges();

    // Consumir el servicio de logueo.
    this.authService.logueo(this.token).subscribe(
      r => {
        let usuario = r['usuario'];
        sessionStorage.setItem('token', r['token']);
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        location.reload();
      },
      error => {
        this.openModalError();
        this.messageBtn = "Iniciar sesión";
        this.cd.detectChanges();
      }
    );
  }

  //Método: cerrarSesion
  //Objetivo: Limpia los datos del usuario y refresca la vista.
  cerrarSesion() {
    sessionStorage.clear();
    location.reload();
  }

  // Métodos para el control de la ventana modal de error en logueo
  openModalError() {
    this.modalErrorActions.emit({ action: "modal", params: ['open'] });
  }
  closeModalError() {
    this.modalErrorActions.emit({ action: "modal", params: ['close'] });
  }
}
