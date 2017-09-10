// Servicios de libros.

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';
import { Libro, NuevoLibro, Catalogo, AutoData, Ejemplar } from './';

@Injectable()
export class LibrosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
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

    // Mapeando la salida.
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
      (r: Response) => {

        // Mapeando la entrada.
        let libro = new Libro();

        libro.id = r['id'];
        libro.isbn = nuevoLibro.isbn;
        libro.titulo = nuevoLibro.titulo;
        libro.edicion = nuevoLibro.edicion;
        libro.autor = nuevoLibro.autor;
        libro.editorial = nuevoLibro.editorial;
        libro.catalogado = false;

        return libro;
      }
    );
  }

  // Método: catalogar
  // Objetivo: asignar los datos de catalogación.
  catalogar(id: number, nuevoCatalogo: Catalogo, materias: AutoData[]): Observable<string> {
    let url = this.baseUrl + '/books/' + id + '/setcatalog';

    // Obtener las materias registradas y las nuevas.
    let division = this.dividirNuevos(nuevoCatalogo.materias, materias);
    let materiasGuardadas = division['viejos'];
    let nuevasMaterias = division['nuevos'];

    // Mapeando la salida.
    let q = JSON.stringify({
      subjects: materiasGuardadas,
      newSubjects: nuevasMaterias,
      category: nuevoCatalogo.categoria,
      authorCode: nuevoCatalogo.codigoAutor,
      image: nuevoCatalogo.img
    });

    // Realizando el POST
    return this.http.post(url, q, { headers: this.headers }).map(
      (r: Response) => {
        return r['message'];
      }
    );
  }

  // Método: finalizarCatalogacion
  // Objetivo: finaliza la catalogación de un libro.
  finalizarCatalogacion(id: number): Observable<string> {
    let url = this.baseUrl + '/books/' + id + '/finishcatalog';
    let q = {};

    // Realizando el GET
    return this.http.post(url, q, { headers: this.headers }).map(
      (r: Response) => {
        return r['message'];
      }
    );
  }

  // Método: obtenerTodos
  // Objetivo: obtener todos los libros registrados.
  obtenerTodos(): Observable<Libro[]> {
    let url = this.baseUrl + '/books';

    // Realizando el GET
    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        // Mapeando la salida
        let libros = new Array<Libro>();

        r.json().forEach(function(item){
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
  // Objetivo: obtener un ejemplar.
  obtener(id: number): Observable<Libro> {
    let url = this.baseUrl + '/books/' + id;

    // Realizar el GET
    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        // Mapeando la salida
        let libro = new Libro;
        let rb = r['book'];
        let rc = r['Copies'];

        libro.id = rb['id'];
        libro.isbn = rb['isbn'];
        libro.titulo = rb['title'];
        libro.edicion = rb['edition'];
        libro.editorial = rb['publisherName'];
        libro.pais = rb['country'];
        libro.anio = rb['year'];
        libro.catalogado = rb['catalogued'];
        libro.autores = [];
        rb['Authors'].json().forEach(function(author){
          libro.autores.push(author['name']);
        });

        // Mapeando el catalogo
        let catalogo = new Catalogo;
        catalogo.materias = [];
        rb['Subjects'].json().forEach(function(subject){
          catalogo.materias.push(subject['name']);
        });
        catalogo.categoria = rb['category'];
        catalogo.codigoAutor = rb['authorCode'];
        catalogo.img = rb['image'];
        libro.catalogo = catalogo;

        // Mapeando los ejemplares
        let ejemplares = new Array<Ejemplar>();
        rc.json().forEach(function(item){
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

  // Método: obtenerAutoLibro
  // Objetivo: obtener los datos de autocompletado para la creación del libro.
  obtenerAutoLibro(): Observable<any> {
    let url = this.baseUrl + '/books/authorspublishers';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        // Mapeando la salida
        let autores = new Array<AutoData>();
        let editoriales = new Array<AutoData>();
        let ra = r['authors'];
        let rp = r['publishers'];

        ra.json().forEach(function(item){
          let autor = new AutoData;

          autor.id = item['id'];
          autor.nombre = item['name'];

          autores.push(autor);
        });

        rp.json().forEach(function(item){
          let editorial = new AutoData;

          editorial.id = item['id'];
          editorial.nombre = item['name'];

          editoriales.push(editorial);
        });

        return {autores: autores, editoriales: editoriales};
      }
    );
  }

  // Método: obtenerAutoCatalogo
  // Objetivo: obtener las materias para autocompletado de catálogo
  obtenerAutoCatalogo(): Observable<AutoData[]> {
    let url = this.baseUrl + '/books/subjects';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        // Mapeando la salida
        let materias = new Array<AutoData>();
        let rs = r['subjects'];

        rs.json().forEach(function(item){
          let materia = new AutoData;

          materia.id = item['id'];
          materia.nombre = item['name'];

          materias.push(materia);
        });

        return materias;
      }
    );
  }

  // Método privado: dividirNuevos
  // Objetivo: obtener los nuevos registros y los datos ya registrados.
  private dividirNuevos(items:string[], data: AutoData[]): any{
    let viejos: number[] = [];
    let nuevos: any[] = [];
    let buscarEn: string[] = [];

    data.forEach(function(d){
      buscarEn.push(d.nombre);
    });

    items.forEach(function(item){
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

    data.forEach(function(d){
      buscarEn.push(d.nombre);
    });

    i = buscarEn.indexOf(item);
    return i > -1 ? data[i].id : 0;
  }
}
