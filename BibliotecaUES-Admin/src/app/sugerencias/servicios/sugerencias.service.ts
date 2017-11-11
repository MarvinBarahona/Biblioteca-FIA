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

import { CookieService } from 'ngx-cookie';
import { Sugerencia, Voto, Pedido } from './';

@Injectable()
export class SugerenciasService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }


  // Método: top10
  // Objetivo: recuperar un listado de las 10 sugerencias con más pedidos
  obtenerTodos(): Observable<Sugerencia[]> {
    let url = this.baseUrl + '/suggestions';

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
          sugerencia.edicion = _sugerencia['edition'];
          sugerencia.isbn = _sugerencia['isbn'];
          sugerencia.votos = _sugerencia['upvotes'];
          sugerencia.pedidos = _sugerencia['orders'];
          sugerencia.estado = _sugerencia['state'];
          sugerencia.precio = _sugerencia['price'];

          if (sugerencia.estado == "Aceptada") {
            sugerencia.cantidad = _sugerencia['quantity'];
          }

          if (sugerencia.estado == "Rechazada") {
            sugerencia.razonRechazo = _sugerencia['reason'];
          }

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
        sugerencia.estado = r['state'];
        sugerencia.votos = r['upvotes'];
        sugerencia.pedidos = r['orders'];
        sugerencia.precio = r['price'];
        sugerencia.detalleVotos = [];
        sugerencia.detallePedidos = [];

        r['Courses'].forEach((_materia) => {
          let v = _materia['upvotes'];
          if (v > 0) {
            let voto = new Voto;
            voto.nombre = _materia['name'];
            voto.cantidad = v;
            sugerencia.detalleVotos.push(voto);
          }

          _materia['votes'].forEach((_actividad) => {
            if (_actividad['priority']) {
              let pedido = new Pedido;
              pedido.nombre = _materia['name'];
              pedido.docente = _actividad['userName'];
              sugerencia.detallePedidos.push(pedido);
            }
          });
        });

        if (sugerencia.estado == "Aceptada") {
          sugerencia.cantidad = r['quantity'];
        }

        if (sugerencia.estado == "Rechazada") {
          sugerencia.razonRechazo = r['reason'];
        }

        return sugerencia;
      }
    );
  }

  // Método: aprobar
  // Objetivo: aprobar una sugerencia pendiente
  aprobar(sugerencia: Sugerencia) : Observable<string> {
    let url = this.baseUrl + '/suggestions/' + sugerencia.id;

    let q = JSON.stringify({state: "Aceptada", price: sugerencia.precio, quantity: sugerencia.cantidad});

    // Realizando GET
    return this.http.put(url, q,{ headers: this.headers }).map(
      (response: Response) => {
        let msg = response.json();
        return msg;
      }
    );
  }

  // Método: rechazar
  // Objetivo: rechazar una sugerencia pendiente
  rechazar(sugerencia: Sugerencia) : Observable<string> {
    let url = this.baseUrl + '/suggestions/' + sugerencia.id;

    let q = JSON.stringify({state: "Rechazada", reason: sugerencia.razonRechazo});

    // Realizando GET
    return this.http.put(url, q,{ headers: this.headers }).map(
      (response: Response) => {
        let msg = response.json();
        return msg;
      }
    );
  }

  // Método: terminarCiclo
  // Objetivo: terminar el ciclo, eliminando las sugerencias aprobadas y rechazadas.
  terminarCiclo() : Observable<string> {
    let url = this.baseUrl + '/suggestions/periods';

    // Realizando GET
    return this.http.post(url, {}, { headers: this.headers }).map(
      (response: Response) => {
        return "success";
      }
    );
  }
}
