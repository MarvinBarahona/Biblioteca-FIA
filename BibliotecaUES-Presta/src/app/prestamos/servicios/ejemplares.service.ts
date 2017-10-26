/*
*Nombre del servicio: ejemplares
*Dirección física: src/app/prestamos/servicios/ejemplares.service.ts
*Objetivo: Proveer los servicios de ejemplares al módulo prestamos
**/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Ejemplar, Libro, Transaccion, Prestamista } from './';

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

        r.forEach((_ejemplar) =>{
          let ejemplar = new Ejemplar;
          ejemplar.id = _ejemplar['id'];
          ejemplar.codigo = _ejemplar['barcode'];
          ejemplar.estado = _ejemplar['state'];
          ejemplares.push(ejemplar);
        });
        return ejemplares;
      }
    );
  }

  // Método: obtenerTransaccionPorCodigo
  // Objetivo: obtener una transacción de un ejemplar por su código de barra.
  obtenerTransaccionPorCodigo(codigo: string): Observable<Transaccion>{
    let url = this.baseUrl + '/copies/' + codigo + '/transaction';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let _ejemplar = r['copy'];
        let _transaccion = r['transaction'];
        let _autoriza = _transaccion['users'][0];

        let transaccion = new Transaccion;
        transaccion.ejemplar = new Ejemplar;
        transaccion.ejemplar.libro = new Libro;

        transaccion.id = _transaccion['id'];
        transaccion.fecha = _transaccion['createdAt'];
        transaccion.autoriza = _autoriza['userName'];

        transaccion.ejemplar.id = _ejemplar['id'];
        transaccion.ejemplar.codigo = _ejemplar['barcode'];
        transaccion.ejemplar.estado = _ejemplar['state'];

        transaccion.esPrestamo = _transaccion['type'] == "Préstamo" || _transaccion['type'] == "Renovación";

        if(transaccion.esPrestamo){
          let _prestamista = _transaccion['users'][1];
          transaccion.prestamista = new Prestamista;
          transaccion.prestamista.id = _prestamista['userId'];
          transaccion.prestamista.nombre = _prestamista['userName'];

          let _detalles = _transaccion['details'];
          transaccion.ejemplar.libro.titulo = _detalles['bookTitle'];
          transaccion.fechaDevolucion = _detalles['returnDate'];
        }

        return transaccion;
      }
    );
  }
}
