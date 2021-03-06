/*
*Nombre del servicio: libros
*Dirección: /src/app/libros/servicios/libros.service.ts
*Objetivo: Proveer los servicios al módulo de libros
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Libro, Catalogo, AutoData, Ejemplar } from './';

@Injectable()
export class LibrosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: catalogar
  // Objetivo: asignar los datos de catalogación.
  catalogar(id: number, nuevoCatalogo: Catalogo, materias: AutoData[]): Observable<string> {
    let url = this.baseUrl + '/books/' + id + '/setcatalog';

    // Obtener las materias registradas y las nuevas.
    let materiasGuardar = nuevoCatalogo.materias;
    nuevoCatalogo.materias = [];
    materiasGuardar.forEach((materia)=>{nuevoCatalogo.materias.push(this.normalizar(materia))});

    let division = this.dividirNuevos(nuevoCatalogo.materias, materias);
    let materiasGuardadas = division['viejos'];
    let nuevasMaterias = division['nuevos'];

    // Mapeando la entrada.
    let q = JSON.stringify({
      subjects: materiasGuardadas,
      newSubjects: nuevasMaterias,
      category: nuevoCatalogo.categoria,
      authorCode: nuevoCatalogo.codigoAutor,
      image: nuevoCatalogo.img
    });

    // Realizando el POST
    return this.http.post(url, q, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();
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
      (response: Response) => {
        let r = response.json();
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
          libro.catalogado = _libro['catalogued'];

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
        rb['Authors'].forEach((author) => {
          libro.autores.push(author['name']);
        });

        // Mapeando el catalogo
        let catalogo = new Catalogo;
        catalogo.materias = [];
        rb['Subjects'].forEach((subject) => {
          catalogo.materias.push(subject['name']);
        });
        catalogo.categoria = rb['category'];
        catalogo.codigoAutor = rb['authorCode'];
        catalogo.img = rb['image'];
        libro.catalogo = catalogo;

        // Mapeando los ejemplares
        let ejemplares = new Array<Ejemplar>();
        rc.forEach((_ejemplar) => {
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

  // Método: obtenerAutoCatalogo
  // Objetivo: obtener las materias para autocompletado de catálogo
  obtenerAutoCatalogo(): Observable<AutoData[]> {
    let url = this.baseUrl + '/books/subjects';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();

        // Mapeando la salida
        let materias = new Array<AutoData>();
        r.forEach((_materia) => {
          let materia = new AutoData;

          materia.id = _materia['id'];
          materia.nombre = _materia['name'];

          materias.push(materia);
        });

        return materias;
      }
    );
  }

  // Método privado: dividirNuevos
  // Objetivo: obtener los nuevos registros y los datos ya registrados.
  private dividirNuevos(items: string[], data: AutoData[]): any {
    let viejos: number[] = [];
    let nuevos: any[] = [];
    let buscarEn: string[] = [];

    data.forEach((d) => {
      buscarEn.push(d.nombre);
    });

    items.forEach((item) => {
      let i = buscarEn.indexOf(item);
      i > -1 ? viejos.push(data[i].id) : nuevos.push({ name: item });
    });

    return { viejos: viejos, nuevos: nuevos };
  }

  // Método privado: normalizar
  // Objeivo: eliminar tildes de palabras.
  normalizar(palabra: string): string {
    palabra = palabra.toLowerCase();
    let from = "ãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    let to = "aaaaaeeeeiiiioooouuuunncc";
    let mapping = {};

    for (var i = 0, j = from.length; i < j; i++) mapping[from.charAt(i)] = to.charAt(i);

    let ret = [];

    for (var i = 0, j = palabra.length; i < j; i++) {
      let c = palabra.charAt(i);

      if (mapping.hasOwnProperty(palabra.charAt(i)))
        ret.push(mapping[c]);
      else
        ret.push(c);
    }
    return ret.join('');
  }
}
