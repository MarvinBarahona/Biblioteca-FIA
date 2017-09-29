// Servicio de sugerencias.

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';

import { Sugerencia, Materia, Carrera } from './';

@Injectable()
export class SugerenciasService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crear
  // Objetivo: guardar una sugerencia, ya sea de un estudiante o de un docente
  crear(sugerencia: Sugerencia, idMateria: number, docente: boolean): Observable<string> {
    let url = this.baseUrl + '/suggestions/' + (docente ? 'teacher' : 'student');

    // Mapeando la entrada
    let _sugerencia = { subjectId: idMateria, title: sugerencia.titulo, author: sugerencia.autor, publisher: sugerencia.editorial, edition: sugerencia.edicion, isbn: sugerencia.isbn, price: sugerencia.precio };


    if (docente) {
      _sugerencia['quantity'] = sugerencia.cantidad;
    }

    let q = JSON.stringify(_sugerencia);

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  // Método: obtenerCarreras
  // Objetivo: obtener carreras con sus respectivas materias
  obtenerCarreras(): Observable<Carrera[]> {
    let url = this.baseUrl + '/suggestions/careers';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      //Mapeando la salida
      (response: Response) => {
        let r = response.json();
        console.log(r);

        let carreras = new Array<Carrera>();
        let rc = r['majors'];
        let rm = r['courses']

        rc.forEach(function(item) {
          // Mapear el objeto carrera
          let carrera = new Carrera;
          carrera.id = item['id'];
          carrera.nombre = item['name'];
          carrera.materias = [];

          carreras.push(carrera);
        });

        rm.forEach(function(subject) {
          // Mapear el objeto materia
          let materia = new Materia;

          materia.id = subject['id'];
          materia.codigo = subject['code'];
          materia.nombre = subject['name'];

          carreras.forEach((carrera) => {
            if (carrera.id == subject['MajorId']) carrera.materias.push(materia);
          });
        });

        return carreras;
      });

  }

  // Método: buscar
  // Objetivo: permite filtrar sugerenciar por diferentes campos
  buscar(key: string, value: string): Observable<Sugerencia[]> {
    let url = this.baseUrl + '/suggestions?' + key + "=" + value;

    // Realizando el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();

        // Mapeando la salida
        let sugerencias = new Array<Sugerencia>();

        r.forEach(function(item) {
          let sugerencia = new Sugerencia;

          sugerencia.id = item['id'];
          sugerencia.titulo = item['title'];
          sugerencia.autor = item['author'];
          sugerencia.edicion = item['edition'];
          sugerencia.isbn = item['isbn'];
          sugerencia.votos = item['upVotes'];
          sugerencia.pedidos = item['orders'];

          sugerencias.push(sugerencia);
        });

        return sugerencias;
      }
    );
  }

  // Método: top10
  // Objetivo: recuperar un listado de las 10 sugerencias con más pedidos
  top10(): Observable<Sugerencia[]> {
    let url = this.baseUrl + '/suggestions';

    // Realizando el GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();

        // Mapeando la salida
        let sugerencias = new Array<Sugerencia>();

        r.forEach(function(item) {
          let sugerencia = new Sugerencia;

          sugerencia.id = item['id'];
          sugerencia.titulo = item['title'];
          sugerencia.autor = item['author'];
          sugerencia.edicion = item['edition'];
          sugerencia.isbn = item['isbn'];
          sugerencia.votos = item['upVotes'];
          sugerencia.pedidos = item['orders'];

          sugerencias.push(sugerencia);
        });

        return sugerencias;
      }
    );
  }

  // Método: obtener
  // Objetivo: recuperar una sugerencia
  obtener(id: number): Observable<Sugerencia> {
    let url = this.baseUrl + '/suggestions/' + id;

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      (response: Response) => {
        let r = response.json();

        // Mapeando la salida
        let sugerencia = new Sugerencia;

        sugerencia.id = r['id'];
        sugerencia.titulo = r['title'];
        sugerencia.edicion = r['edition'];
        sugerencia.autor = r['author'];
        sugerencia.isbn = r['isbn'];
        sugerencia.editorial = r['publisher'];
        sugerencia.materias = [];

        // Mapear materias con sus respectivos votos y pedidos
        let materias = new Array<Materia>();

        r['Courses'].forEach(function(item) {
          let materia = new Materia;
          materia.id= item['id'];
          materia.nombre = item['name'];
          materia.votos = item['upvotes'];
          materia.pedidos = item['orders'];

          materias.push(materia);
        });

        sugerencia.materias = materias;

        return sugerencia;
      }
    );
  }

  // Método: votar
  // Objetivo: agregar un voto
  votar(id: number): Observable<string> {
    let url = this.baseUrl + '/suggestions/' + id + '/votes';

    let q = JSON.stringify({ subjectId: id });

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }
}
