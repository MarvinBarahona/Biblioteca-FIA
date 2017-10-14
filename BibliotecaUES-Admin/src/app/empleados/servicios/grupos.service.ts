/*
*Nombre del servicio: grupos
*Dirección: /src/app/empleados/servicios/grupos.service.ts
*Objetivo: proveer los servicios de grupos al módulo de empleados
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Grupo } from './';

@Injectable()
export class GruposService {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
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

        r.forEach((_grupo) => {
          let grupo = new Grupo;
          grupo.id = _grupo['id'];
          grupo.nombre = _grupo['name'];
          grupos.push(grupo);
        });
        return grupos;
      }
    );
  }
}
