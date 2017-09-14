// Servicios de libros.

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';
import { Libro, Catalogo, Ejemplar } from './';

@Injectable()
export class LibrosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  // Método: obtenerTodos
  // Objetivo: obtener todos los libros registrados.
  obtenerTodos(): Observable<Libro[]> {
    let url = this.baseUrl + '/books';

    // Realizando el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        console.log(r);
        // Mapeando la salida
        let libros = new Array<Libro>();

        r.forEach(function(item) {
          let libro = new Libro;

          libro.id = item['id'];
          libro.isbn = item['isbn'];
          libro.titulo = item['title'];
          libro.edicion = item['edition'];
          libro.autor = item['authorName'];
          libro.editorial = item['publisherName'];
          libro.catalogado = item['catalogued'];

          libros.push(libro);
        });

        return libros;
      }
    );
  }

  // Método: obtener
  // Objetivo: obtener un libro
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
        rb['Authors'].forEach(function(author) {
          libro.autores.push(author['name']);
        });

        // Mapeando el catalogo
        let catalogo = new Catalogo;
        catalogo.materias = [];
        rb['Subjects'].forEach(function(subject) {
          catalogo.materias.push(subject['name']);
        });
        catalogo.categoria = rb['category'];
        catalogo.codigoAutor = rb['authorCode'];
        catalogo.img = rb['image'];
        libro.catalogo = catalogo;

        // Mapeando los ejemplares
        let ejemplares = new Array<Ejemplar>();
        rc.forEach(function(item) {
          let ejemplar = new Ejemplar;
          ejemplar.id = item['id'];
          ejemplar.codigo = item['barcode'];
          ejemplar.estado = item['state'];
          ejemplares.push(ejemplar);
        });
        libro.ejemplares = ejemplares;

        return libro;
      }
    );
  }
}
