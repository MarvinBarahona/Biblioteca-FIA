/*
*Nombre del módulo: Inicio de sesión
*Dirección física: src\app\libros\componentes\login.component.ts
*Objetivo: Mostrar inicio de sesión de google.
**/
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const gapi: any;

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit {
  auth2: any;
  token: string;

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
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      console.log(profile);
      this.token = googleUser.getAuthResponse().id_token;
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      //YOUR CODE HERE


    }, (error) => {
      alert(JSON.stringify(error, undefined, 2));
    });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( () => {
      console.log('User signed out.');
    });
  }
}
