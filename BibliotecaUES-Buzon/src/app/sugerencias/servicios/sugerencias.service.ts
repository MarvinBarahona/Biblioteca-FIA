// Servicios de sugerencias.

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';
// import { Sugerencia, Carrera, Materia } from './';
import { Sugerencia, Materia, Carrera, Voto, Pedido } from './';

@Injectable()
export class SugerenciasService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  // Método: obtenerCarreras
  // Objetivo: obtener carreras con sus respectivas materias
  obtenerCarreras(): Observable<Carrera[]>{
    let url = this.baseUrl + '/suggestions/careers';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      //Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let carreras = new Array<Carrera>();

        r.forEach(function(item) {
          // Mapear el objeto carrera
          let carrera = new Carrera;
          carrera.id = item['id'];
          carrera.nombre = item['name'];
          carrera.materias = [];

          // Mapear el objeto materia
          let materias = new Array<Materia>();
          item['subjects'].forEach(function(subject){
            let materia = new Materia;
            materia.id = subject['id'];
            materia.codigo = subject['code'];
            materia.nombre = subject['name'];
            materias.push(materia);
          });

          carrera.materias = materias;
        });

        return carreras;
      }
    );
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
  obtener(id: number): Observable<Sugerencia>{
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
        sugerencia._votos = [];
        sugerencia._pedidos = [];

        // Mapear los votos
        let votos = new Array<Voto>();
        r['upVotes'].forEach(function(item){
          let voto = new Voto;
          voto.idMateria = item['subjectId'];
          voto.materia = item['subjectName'];
          voto.cantidad = item['votes'];

          votos.push(voto);
        });
        sugerencia._votos = votos;

        // Mapear los votos
        let pedidos = new Array<Pedido>();
        r['orders'].forEach(function(item){
          let pedido = new Pedido;
          pedido.idMateria = item['subjectId'];
          pedido.materia = item['subjectName'];
          pedido.cantidad = item['votes'];

          pedidos.push(pedido);
        });
        sugerencia._pedidos = pedidos;

        return sugerencia;
      }
    );
  }

  // Método: votar
  // Objetivo: agregar un voto
  votar(id: number): Observable<string>{
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
