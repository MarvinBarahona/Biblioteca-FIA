/*
*Nombre del servicio: descartes
*Dirección: /src/app/descartes/servicios/descartes.service.ts
*Objetivo: Proveer los servicios de descartes al módulo de descartes
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Descarte, Ejemplar, Libro} from './';

@Injectable()
export class DescartesService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crear
  // Objetivo: crear un nuevo descarte
  crear(descarte: Descarte): Observable<string> {
    let url = this.baseUrl + "/transactions/discards";

    // Haciendo un arreglo de ids de ejemplares de salida
    let ejemplares = [];
    descarte.ejemplares.forEach((ejemplar)=>{
      ejemplares.push(ejemplar.id);
    });

    // Agregando titulo al descarte
    let mes = (new Date).getMonth();
    let anio = (new Date).getFullYear();
    let ciclo = (mes >= 3 && mes <= 8) ? "I" : "II";

    let titulo = "Descarte del ciclo " + ciclo + " del año " + anio;

    // Mapeando la entrada
    let q = JSON.stringify({notes: titulo, copies: ejemplares});

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  // Método: obtenerTodos
  // Objetivo: obtener todos los descartes realizados
  obtenerTodos(): Observable<any> {
    let url = this.baseUrl + '/copies/lots?type=5';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let a = response.json();
        let r = a[0];
        let descartes = new Array<Descarte>();

        r.forEach((_descarte) => {
          let descarte = new Descarte;
          descarte.id = _descarte['id'];
          descarte.nombre = _descarte['notes'];
          descarte.fecha = _descarte['createdAt'];
          descarte.usuario = _descarte['userName'];
          descartes.push(descarte);
        });

        return descartes;
      }
    );
  }

  // Método: obtener
  // Objetivo: obtener un descarte (de entrada o salida)
  obtener(id: number): Observable<Descarte> {
    let url = this.baseUrl + '/transactions/' + id;

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let descarte = new Descarte;
        let rd = r['details'];
        let rc = r['copies'];

        // Mapear el objeto de descarte
        descarte.id = r['id'];
        descarte.nombre = r['notes'];
        descarte.usuario = r['userName'];
        descarte.fecha = r['createdAt'];

        // Mapear las ejemplares.
        let ejemplares = new Array<Ejemplar>();
        rc.forEach((_ejemplar) =>{
          let ejemplar = new Ejemplar;
          ejemplar.id = _ejemplar['id'];
          ejemplar.codigo = _ejemplar['barcode'];
          ejemplar.estado = _ejemplar['state'];

          // Mapear el libro
          let rb = _ejemplar['book'];
          let libro = new Libro;
          libro.id = rb['id'];
          libro.titulo = rb['title'];
          libro.edicion = rb['edition'];
          ejemplar.libro = libro;

          ejemplares.push(ejemplar);
        });
        descarte.ejemplares = ejemplares;

        return descarte;
      }
    );
  }

  // Método: obtenerCandidatas
  // Objetivo: obtener todos los ejemplares candidatos a ser descartados
  obtenerCandidatos(): Observable<Ejemplar[]> {
    let url = this.baseUrl + '/copies/discards';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let ejemplares = new Array<Ejemplar>();

        r.forEach((_ejemplar) => {
          let ejemplar = new Ejemplar;
          ejemplar.id = _ejemplar['id'];
          ejemplar.codigo = _ejemplar['barcode'];
          ejemplar.estado = _ejemplar['state'];
          ejemplar.ultimaTransaccion = _ejemplar['lastTransaction'];
          ejemplar.agregar = false;

          // Mapear el libro
          let rb = _ejemplar['book'];
          let libro = new Libro;
          libro.id = rb['id'];
          libro.titulo = rb['title'];
          libro.edicion = rb['edition'];
          ejemplar.libro = libro;

          ejemplares.push(ejemplar);
        });
        return ejemplares;
      }
    );
  }
}
