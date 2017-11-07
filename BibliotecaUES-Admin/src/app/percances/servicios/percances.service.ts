/*
*Nombre del servicio: percances
*Dirección: /src/app/percances/servicios/percances.service.ts
*Objetivo: Proveer los servicios al módulo de percances
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Percance, Ejemplar, Libro } from './';

@Injectable()
export class PercancesService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: obtenerTodos
  // Objetivo: obtener todos los percances realizados
  obtenerTodos(): Observable<any> {
    let url = this.baseUrl + '/copies/lots?type=4';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let a = response.json();
        let r = a[0];
        let percances = new Array<Percance>();

        r.forEach((_percance) => {
          let percance = new Percance;
          percance.id = _percance['id'];
          percance.fecha = _percance['createdAt'];
          percance.prestamista = _percance['users'][1]['userName'];
          percance.resuelto = _percance['RelatedId']? true: false;

          let ejemplar = new Ejemplar;
          ejemplar.id = _percance['copies'][0]['id'];
          ejemplar.codigo = _percance['copies'][0]['code'];

          let libro = new Libro;
          libro.titulo = _percance['details']['bookTitle'];
          libro.edicion = _percance['details']['bookEdition'];
          ejemplar.libro = libro;

          percance.ejemplar = ejemplar;

          percances.push(percance);
        });

        return percances;
      }
    );
  }
}
