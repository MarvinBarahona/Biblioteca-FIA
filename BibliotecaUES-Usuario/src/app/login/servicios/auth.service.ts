// Servicios de autenticación

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { Usuario } from './'

@Injectable()
export class AuthService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  // Método: logueo
  // Objetivo: permite a los usuarios loguearse.
  logueo(token: string): Observable<any> {
    let url = this.baseUrl + '/authentication/verifyGoogle';
    let q = JSON.stringify({ token: token });

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return {usuario: this.mapearUsuario(r['user']), token: r['token']};
      }
    );
  }


  // Método privado: mapearUsuario
  // Objetivo: convertir un json de respuesta en un objeto ve Usuario.
  private mapearUsuario(r: any): Usuario{
    let usuario = new Usuario;
    usuario.id = 0;
    usuario.correo = r['email'];
    usuario.nombre = r['fullname'];
    usuario.grupo = r['Group'];
    usuario.politicas = r['Policies'];

    return usuario;
  }

}
