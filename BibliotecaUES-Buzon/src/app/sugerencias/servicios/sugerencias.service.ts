/*
*Nombre del servicio: sugerencias
*Dirección física: src/app/sugerencias/servicios/sugerencias.service.ts
*Objetivo: Proveer servicios al módulo de sugerencias
**/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { Sugerencia, Materia, Carrera } from './';

@Injectable()
export class SugerenciasService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') });
  }

  // Método: crear
  // Objetivo: guardar una sugerencia, ya sea de un estudiante o de un docente
  crear(sugerencia: Sugerencia, idMateria: number, docente: boolean): Observable<any> {
    let url = this.baseUrl + '/suggestions/' + (docente ? 'teacher' : 'student');

    // Mapeando la entrada
    let _sugerencia = { subjectId: idMateria, title: sugerencia.titulo, author: sugerencia.autor, publisher: sugerencia.editorial, edition: sugerencia.edicion, isbn: sugerencia.isbn, price: sugerencia.precio };

    // Agregar la cantidad si es docente
    if (docente) {
      _sugerencia['quantity'] = sugerencia.cantidad;
    }

    let q = JSON.stringify(_sugerencia);

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r;
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

        let carreras = new Array<Carrera>();
        let rc = r['majors'];
        let rm = r['courses']

        rc.forEach((_carrera) => {
          // Mapear el objeto carrera
          let carrera = new Carrera;
          carrera.id = _carrera['id'];
          carrera.nombre = _carrera['name'];
          carrera.materias = [];

          carreras.push(carrera);
        });

        rm.forEach((subject) =>{
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

        r.forEach((_sugerencia) => {
          let sugerencia = new Sugerencia;

          sugerencia.id = _sugerencia['id'];
          sugerencia.titulo = _sugerencia['title'];
          sugerencia.autor = _sugerencia['author'];
          sugerencia.edicion = _sugerencia['edition'];
          sugerencia.isbn = _sugerencia['isbn'];
          sugerencia.votos = _sugerencia['upvotes'];
          sugerencia.pedidos = _sugerencia['orders'];

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

        r.forEach((_sugerencia) =>{
          let sugerencia = new Sugerencia;

          sugerencia.id = _sugerencia['id'];
          sugerencia.titulo = _sugerencia['title'];
          sugerencia.autor = _sugerencia['author'];
          sugerencia.edicion = _sugerencia['edition'];
          sugerencia.isbn = _sugerencia['isbn'];
          sugerencia.votos = _sugerencia['upvotes'];
          sugerencia.pedidos = _sugerencia['orders'];

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

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));

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

        // Pone el valor inicial a FALSO
        sugerencia.usuario = false;

        // Mapear materias con sus respectivos votos y pedidos
        let materias = new Array<Materia>();

        r['Courses'].forEach((_materia) => {
          let materia = new Materia;
          materia.id= _materia['id'];
          materia.nombre = _materia['name'];
          materia.votos = _materia['upvotes'];
          materia.pedidos = _materia['orders'];

          _materia['votes'].forEach((voto)=>{
            if(voto.userId == usuario.id){
              materia.usuario = true;
              sugerencia.usuario = true;
            }
            else materia.usuario = false;
          });

          materias.push(materia);
        });

        sugerencia.materias = materias;

        return sugerencia;
      }
    );
  }

  // Método: votar
  // Objetivo: agregar un voto
  votar(sugerenciaId: number, materiaId: number): Observable<string> {
    let url = this.baseUrl + '/suggestions/' + sugerenciaId + '/votes';

    let q = JSON.stringify({ subjectId: materiaId });

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
