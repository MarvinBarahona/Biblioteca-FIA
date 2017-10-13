/*
*Nombre del servicio: libro-seleccion
*Dirección: /src/app/libro-seleccion/servicios/libro-seleccion.service.ts
*Objetivo: Proveer los servicios al módulo de libro-seleccion
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Libro, NuevoLibro, AutoData } from './';

@Injectable()
export class LibroSeleccionService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crear
  // Objetivo: Crear un nuevo libro.
  crear(nuevoLibro: NuevoLibro, autores: AutoData[], editoriales: AutoData[]): Observable<Libro> {
    let url = this.baseUrl + '/books';

    // Obtener los autores registrados y nuevos.
    let division = this.dividirNuevos(nuevoLibro.autores, autores);
    let autoresGuardados = division['viejos'];
    let nuevosAutores = division['nuevos'];

    // Obtener la editorial
    let editorial = {id: this.obtenerIdData(nuevoLibro.editorial, editoriales), name: nuevoLibro.editorial};

    // Asignando el autor principal
    nuevoLibro.autor = nuevoLibro.autores[0];

    // Mapeando la entrada.
    let q = JSON.stringify({
      book: {
        isbn: nuevoLibro.isbn,
        title: nuevoLibro.titulo,
        authorName: nuevoLibro.autor,
        edition: nuevoLibro.edicion,
        year: nuevoLibro.anio,
        country: nuevoLibro.pais
      },
      authors: autoresGuardados,
      newAuthors: nuevosAutores,
      publisher: editorial
    });

    // Realizar el POST
    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        // Mapeando la salida
        let libro = new Libro();

        libro.id = r['id'];
        libro.isbn = nuevoLibro.isbn;
        libro.titulo = nuevoLibro.titulo;
        libro.edicion = nuevoLibro.edicion;
        libro.autor = nuevoLibro.autor;

        return libro;
      }
    );
  }

  // Método: obtenerTodos
  // Objetivo: obtener todos los libros registrados.
  obtenerTodos(): Observable<Libro[]> {
    let url = this.baseUrl + '/books';

    // Realizando el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        // Mapeando la salida
        let libros = new Array<Libro>();

        r.forEach((item)=>{
          let libro = new Libro;

          libro.id = item['id'];
          libro.isbn = item['isbn'];
          libro.titulo = item['title'];
          libro.edicion = item['edition'];
          libro.autor = item['authorName'];

          libros.push(libro);
        });

        return libros;
      }
    );
  }

  // Método: obtenerAutoLibro
  // Objetivo: obtener los datos de autocompletado para la creación del libro.
  obtenerAutoLibro(): Observable<any> {
    let url = this.baseUrl + '/books/authorspublishers';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
        // Mapeando la salida
        let autores = new Array<AutoData>();
        let editoriales = new Array<AutoData>();
        let ra = r['authors'];
        let rp = r['publishers'];

        ra.forEach((item) => {
          let autor = new AutoData;

          autor.id = item['id'];
          autor.nombre = item['name'];

          autores.push(autor);
        });

        rp.forEach((item) => {
          let editorial = new AutoData;

          editorial.id = item['id'];
          editorial.nombre = item['name'];

          editoriales.push(editorial);
        });

        return { autores: autores, editoriales: editoriales };
      }
    );
  }

  // Método privado: dividirNuevos
  // Objetivo: obtener los nuevos registros y los datos ya registrados.
  private dividirNuevos(items:string[], data: AutoData[]): any{
    let viejos: number[] = [];
    let nuevos: any[] = [];
    let buscarEn: string[] = [];

    data.forEach((d)=>{
      buscarEn.push(d.nombre);
    });

    items.forEach((item) =>{
      let i = buscarEn.indexOf(item);
      i > -1 ? viejos.push(data[i].id) : nuevos.push({name: item});
    });

    return {viejos: viejos, nuevos: nuevos};
  }

  // Método privado: obtenerIdData
  // Objetivo: obtener el id de un item de autocompletado, o 0 si no existe.
  private obtenerIdData(item: string, data: AutoData[]): number {
    let buscarEn: string[] = [];
    let i: number;

    data.forEach((d)=>{
      buscarEn.push(d.nombre);
    });

    i = buscarEn.indexOf(item);
    return i > -1 ? data[i].id : 0;
  }
}
