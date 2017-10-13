/*
*Nombre del servicio: ejemplares
*Dirección: /src/app/intercambios/servicios/ejemplares.service.ts
*Objetivo: Proveer los servicios de ejemplares al módulo de intercambios
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Ejemplar, Libro } from './';

@Injectable()
export class EjemplaresService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: obtenerTodos
  // Objetivo: obtener todos los ejemplares existentes.
  obtenerTodos(): Observable<Ejemplar[]> {
    let url = this.baseUrl + '/copies';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let ejemplares = new Array<Ejemplar>();

        r.forEach((item) => {
          let ejemplar = new Ejemplar;
          ejemplar.id = item['id'];
          ejemplar.codigo = item['barcode'];
          ejemplar.estado = item['state'];
          ejemplares.push(ejemplar);
        });
        return ejemplares;
      }
    );
  }

  // Método: obtenerPorCodigo
  // Objetivo: obtener un ejemplar por su código de barra, solo si está inactivo
  obtenerInactivosPorCodigo(codigo: string): Observable<Ejemplar>{
    let url = this.baseUrl + '/copies/barcode/' + codigo + "?inactive=1";

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let ejemplar = new Ejemplar;
        let rc = r['copy'];
        let rb = r['book'];

        // Mapear el objeto de ejemplar
        ejemplar.id = rc['id'];
        ejemplar.codigo = rc['barcode'];
        ejemplar.estado = rc['state'];

        // Mapear el libros
        let libro = new Libro;
        libro.id = rb['id'];
        libro.titulo = rb['title'];
        libro.edicion = rb['edition'];
        ejemplar.libro = libro;

        return ejemplar;
      }
    );
  }

  // Método: catalogar
  // Objetivo: asignar códigos de barra a los ejemplares de un intercambio
  catalogar(ejemplares: Ejemplar[]): Observable<string>{
    let url = this.baseUrl + '/copies/massCataloging';

    // Mapeando la entrada.
    let copies = [];
    ejemplares.forEach((ejemplar)=>{
      if(!ejemplar.ingresado && ejemplar.codigo) copies.push({id: ejemplar.id, barcode: ejemplar.codigo});
    });

    let q = JSON.stringify({copies: copies});

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        return "guardados";
      }
    );
  }
}
