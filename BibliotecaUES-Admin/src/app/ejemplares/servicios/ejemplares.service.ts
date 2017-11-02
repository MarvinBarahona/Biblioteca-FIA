/*
*Nombre del servicio: ejemplares
*Dirección: /src/app/ejemplares/servicios/ejemplares.service.ts
*Objetivo: Provee los servicios al módulo de ejemplares
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Ejemplar, NuevoEjemplar, Transaccion, Libro } from './';

@Injectable()
export class EjemplaresService {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crearCompra
  // Objetivo: crear una nueva compra de ejemplar individual.
  crearCompra(nuevoEjemplar: NuevoEjemplar): Observable<string> {
    let url = this.baseUrl + '/transactions/purchase';

    // Mapeando la entrada
    let ejemplares = [];
    ejemplares.push({ bookId: nuevoEjemplar.libro.id, quantity: 1, barcode: nuevoEjemplar.codigo });

    let q = JSON.stringify({ notes: "Compra de ejemplar", copies: ejemplares, details: {} });

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  // Método: crearDonacion
  // Objetivo: crear una nueva donación de ejemplar individual.
  crearDonacion(nuevoEjemplar: NuevoEjemplar): Observable<string> {
    let url = this.baseUrl + '/transactions/donation';

    // Mapeando la entrada
    let ejemplares = [];
    ejemplares.push({ bookId: nuevoEjemplar.libro.id, quantity: 1, barcode: nuevoEjemplar.codigo });

    let detalles = {donante: nuevoEjemplar.donante};

    let q = JSON.stringify({ notes: "Donación de ejemplar", copies: ejemplares, details: detalles });

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
  // Objetivo: obtener todos los ejemplares existentes.
  obtenerTodos(): Observable<Ejemplar[]> {
    let url = this.baseUrl + '/copies';

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
          ejemplares.push(ejemplar);
        });
        return ejemplares;
      }
    );
  }

  // Método: obtener
  // Objetivo: obtener un ejemplar
  obtener(id: number): Observable<Ejemplar> {
    let url = this.baseUrl + '/copies/' + id;

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let ejemplar = new Ejemplar;
        let rc = r['copy'];
        let rt = rc['transactions'];
        let rb = r['book'];

        // Mapear el objeto de ejemplar
        ejemplar.id = rc['id'];
        ejemplar.codigo = rc['barcode'];
        ejemplar.estado = rc['state'];

        // Mapear las transacciones.
        let transacciones = new Array<Transaccion>();
        rt.forEach((_transaccion) =>{
          let transaccion = new Transaccion;
          transaccion.id = _transaccion['id'];
          transaccion.nombre = _transaccion['notes'];
          transaccion.fecha = _transaccion['createdAt'];
          transaccion.usuario = _transaccion['userName'];
          transaccion.tipo = _transaccion['type'];
          transaccion.individual = _transaccion['single'];
          transaccion.detalles = _transaccion['details'];
          transacciones.push(transaccion);
        });
        // Ordenar las transacciones por orden de creación.
        transacciones.sort((a, b) => {return a.id - b.id});
        ejemplar.transacciones = transacciones;

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

  // Método: obtenerPorCodigo
  // Objetivo: obtener un ejemplar por su código de barra.
  obtenerPorCodigo(codigo: string): Observable<Ejemplar>{
    let url = this.baseUrl + '/copies/barcode/' + codigo;

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
}
