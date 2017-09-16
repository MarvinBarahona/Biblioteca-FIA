// Servicios de empleados

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';
import { Empleado, Politica, Grupo } from './';

@Injectable()
export class EmpleadosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crear
  // Objetivo: crear un nuevo empleado.
  crear(empleado: Empleado): Observable<string> {
    let url = this.baseUrl + "/users"

    // Mapeando la entrada
    let q = JSON.stringify({email: empleado.correo, fullname: empleado.nombre, group: empleado.grupo.id});

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );    
  }

  // Método: obtenerGrupos
  // Objetivo: obtener los grupos disponibles para asignarse al nuevo empleados
  obtenerGrupos(): Observable<Grupo[]> {
    let url = this.baseUrl + '/users/groups';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let grupos = new Array<Grupo>();

        r.forEach(function(item) {
          let grupo = new Grupo;
          grupo.id = item['id'];
          grupo.nombre = item['name'];
          grupos.push(grupo);
        });
        return grupos;
      }
    );
  }

}
