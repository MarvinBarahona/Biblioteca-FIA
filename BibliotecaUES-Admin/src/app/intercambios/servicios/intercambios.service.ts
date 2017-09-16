// Servicios de intercambios

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';
import { Intercambio, Ejemplar, Libro, NuevaEntrada } from './';

@Injectable()
export class IntercambiosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crear
  // Objetivo: crear un nuevo intercambio
  crear(intercambio: Intercambio): Observable<string> {
    let url = this.baseUrl + "/transactions/tradeout";

    // Haciendo un arreglo de ids de ejemplares de salida
    let ejemplares = [];
    intercambio.salidas.forEach((ejemplar)=>{
      ejemplares.push(ejemplar.id);
    });

    // Mapeando la entrada
    let q = JSON.stringify({notes: intercambio.facultad, copies: ejemplares});

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  // Método: crearEntrada
  // Objetivo: crear la entrada de un intercambio
  crearEntrada(entrada: NuevaEntrada): Observable<string> {
    let url = this.baseUrl + '/transactions/tradein';

    // Haciendo un arreglo de ids de ejemplares de salida
    let ejemplares = [];
    entrada.ejemplares.forEach((ejemplar)=>{
      ejemplares.push({bookId: ejemplar.libro.id, quantity: ejemplar.cantidad});
    });

    // Mapeando la entrada
    let q = JSON.stringify({transactionId: entrada.id, notes: entrada.facultad, copies: ejemplares});

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
  // Objetivo: obtener todos los intercambios realizados
  obtenerTodos(): Observable<any> {
    let url = this.baseUrl + '/copies/lots?type=2';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let a = response.json();
        console.log(a);
        // let r1 = a[0];
        // let r2 = a[1];
        // let adquisiciones = new Array<Adquisicion>();
        //
        // r1.forEach(function(item) {
        //   let adquisicion = new Adquisicion;
        //   adquisicion.id = item['id'];
        //   adquisicion.nombre = item['notes'];
        //   adquisicion.fecha = item['createdAt'];
        //   adquisicion.tipo = item['type'];
        //   adquisicion.usuario = item['fullname'];
        //   adquisiciones.push(adquisicion);
        // });
        //
        // r2.forEach(function(item) {
        //   let adquisicion = new Adquisicion;
        //   adquisicion.id = item['id'];
        //   adquisicion.nombre = item['notes'];
        //   adquisicion.fecha = item['createdAt'];
        //   adquisicion.tipo = item['type'];
        //   adquisicion.usuario = item['fullname'];
        //   adquisiciones.push(adquisicion);
        // });
        //
        // return adquisiciones;
        return a;
      }
    );
  }

  // Método: obtenerEjemplares
  // Objetivo: obtener todos los ejemplares existentes.
  obtenerEjemplares(): Observable<Ejemplar[]> {
    let url = this.baseUrl + '/copies';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let ejemplares = new Array<Ejemplar>();

        r.forEach(function(item) {
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
  obtenerPorCodigo(codigo: string): Observable<Ejemplar>{
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
}
