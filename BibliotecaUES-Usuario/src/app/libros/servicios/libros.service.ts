/*
*Nombre del servicio: libros
*Dirección física: src/app/libros/servicios/libros.service.ts
*Objetivo: Proveer los servicios de libro al módulo libros
**/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Libro, Catalogo, Ejemplar } from './';

@Injectable()
export class LibrosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  // Método: obtenerTodos
  // Objetivo: obtener todos los libros registrados.
  obtenerTodos(): Observable<Libro[]> {
    let url = this.baseUrl + '/books/public';

    // Realizando el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        // Mapeando la salida
        let libros = new Array<Libro>();

        r.forEach((_libro) => {
          let libro = new Libro;

          libro.id = _libro['id'];
          libro.isbn = _libro['isbn'];
          libro.titulo = _libro['title'];
          libro.edicion = _libro['edition'];
          libro.autor = _libro['authorName'];
          libro.editorial = _libro['publisherName'];

          // Mapeando el catalogo
          let catalogo = new Catalogo;
          catalogo.img = _libro['image'];
          libro.catalogo = catalogo;
          libros.push(libro);
        });

        return libros;
      }
    );
  }

  // Método: obtener
  // Objetivo: obtener un libro
  obtener(id: number): Observable<Libro> {
    let url = this.baseUrl + '/books/' + id + '/public';

    // Realizar el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        // Mapeando la salida
        let libro = new Libro;

        libro.id = r['id'];
        libro.isbn = r['isbn'];
        libro.titulo = r['title'];
        libro.edicion = r['edition'];
        libro.editorial = r['publisherName'];
        libro.pais = r['country'];
        libro.anio = r['year'];
        libro.catalogado = r['catalogued'];
        libro.autores = [];
        r['Authors'].forEach((author) => {
          libro.autores.push(author['name']);
        });

        // Mapeando el catalogo
        let catalogo = new Catalogo;
        catalogo.materias = [];
        r['Subjects'].forEach((subject) => {
          catalogo.materias.push(subject['name']);
        });
        catalogo.categoria = r['category'];
        catalogo.codigoAutor = r['authorCode'];
        catalogo.img = r['image'];
        libro.catalogo = catalogo;

        return libro;
      }
    );
  }

  // Método: buscar
  // Objetivo: permite filtrar libros por los campos
  buscar(key: string, value: string): Observable<Libro[]> {
    let url = this.baseUrl + '/books/public?' + key + "=" + value;

    // Realizando el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        // Mapeando la salida
        let libros = new Array<Libro>();

        r.forEach((_libro) => {
          let libro = new Libro;

          libro.id = _libro['id'];
          libro.isbn = _libro['isbn'];
          libro.titulo = _libro['title'];
          libro.edicion = _libro['edition'];
          libro.autor = _libro['authorName'];
          libro.editorial = _libro['publisherName'];

          // Mapeando el catalogo
          let catalogo = new Catalogo;
          catalogo.img = _libro['image'];
          libro.catalogo = catalogo;
          libros.push(libro);
        });

        return libros;
      }
    );
  }
}
