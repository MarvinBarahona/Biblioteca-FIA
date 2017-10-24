/*
*Nombre del servicio: reservaciones
*Dirección física: src/app/libros/servicios/reservaciones.service.ts
*Objetivo: Proveer los servicios de reservaciones al módulo libros
**/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { Libro, Ejemplar, Catalogo } from './';

@Injectable()
export class SugerenciasService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') });
  }

  // Método: obtener
  // Objetivo: obtener un libro.
  obtener(id: number): Observable<Libro> {
    let url = this.baseUrl + '/books/' + id;

    // Realizar el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        // Mapeando la salida
        let libro = new Libro;
        let rb = r['book'];
        let rc = r['copies'];

        libro.id = rb['id'];
        libro.isbn = rb['isbn'];
        libro.titulo = rb['title'];
        libro.edicion = rb['edition'];
        libro.editorial = rb['publisherName'];
        libro.pais = rb['country'];
        libro.anio = rb['year'];
        libro.catalogado = rb['catalogued'];
        libro.autores = [];
        rb['Authors'].forEach((author) =>{
          libro.autores.push(author['name']);
        });

        // Mapeando el catalogo
        let catalogo = new Catalogo;
        catalogo.materias = [];
        rb['Subjects'].forEach((subject) =>{
          catalogo.materias.push(subject['name']);
        });
        catalogo.categoria = rb['category'];
        catalogo.codigoAutor = rb['authorCode'];
        catalogo.img = rb['image'];
        libro.catalogo = catalogo;

        // Mapeando los ejemplares
        let ejemplares = new Array<Ejemplar>();
        rc.forEach((_ejemplar) =>{
          let ejemplar = new Ejemplar;
          ejemplar.id = _ejemplar['id'];
          ejemplar.codigo = _ejemplar['barcode'];
          ejemplar.estado = _ejemplar['state'];
          ejemplares.push(ejemplar);
        });
        libro.ejemplares = ejemplares;

        return libro;
      }
    );
  }

  // Método: reservacion
  // Objetivo: Confirmar la reservación de un ejemplar
  reservacion(id: number, titulo: string): Observable<string> {
    let url = this.baseUrl + '/transactions/reservations';

    let q = JSON.stringify({
      copies: [id],
      details: { bookTitle: titulo }
    });

    return this.http.put(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }
}
