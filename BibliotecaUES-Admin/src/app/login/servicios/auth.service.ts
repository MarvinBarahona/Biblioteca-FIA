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
  logueo(correo: string, contra: string): Observable<any> {
    let url = this.baseUrl + '/authentication/login';
    let q = JSON.stringify({ email: correo, password: contra });

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return {usuario: this.mapearUsuario(r['user']), token: r['token']};
      }
    );
  }

  // Método: verificar
  // Objetivo: autenticar a un usuario, dado un token.
  verificar(token:string): Observable<Usuario>{
    let url = this.baseUrl + "/authentication/verify/" + token;

    return this.http.get(url).map(
      (response: Response) => {
        let r = response.json();
        return this.mapearUsuario(r);
      }
    );
  }

  // Método: restaurarContra
  // Objetivo: permite a los usuarios solicitar el cambio de contraseña.
  restaurarContra(correo: string): Observable<string> {
    let url = this.baseUrl + '/users/recovery';
    let q = JSON.stringify({email: correo});

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return r["message"];
      }
    );
  }

  // Método: cambiarContra
  // Objetivo: permite a los usuarios cambiar de contraseña
  cambiarContra(contra: string, id: number, token: string): Observable<string> {
    let url = this.baseUrl + '/users/changePassword';
    let q = JSON.stringify({password: contra, userId: id, token: token});

    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        return r["message"];
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
