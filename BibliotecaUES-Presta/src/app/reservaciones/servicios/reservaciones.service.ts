/*
*Nombre del servicio: reservaciones
*Dirección física: src/app/reservaciones/servicios/reservacionesaciones.service.ts
*Objetivo: Proveer los servicios al módulo reservaciones
**/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Reservacion, Prestamista, Ejemplar } from './';

@Injectable()
export class ReservacionesService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: obtenerTodas
  // Objetivo: obtener todos las reservaciones existentes.
  obtenerTodas(): Observable<Reservacion[]> {
    let url = this.baseUrl + '/copies/lots?type=3';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let reservaciones = new Array<Reservacion>();

        r.forEach((_reservacion) => {
          let reservacion = new Reservacion;
          reservacion.id = _reservacion['id'];
          reservacion.fecha = _reservacion['createdAt'];

          let _ejemplar = _reservacion['copies'][0];
          let _detalle = _reservacion['details'];

          let ejemplar = new Ejemplar;
          ejemplar.id = _ejemplar['id'];
          ejemplar.codigo = _ejemplar['code'];
          ejemplar.titulo = _detalle['bookTitle'];
          reservacion.ejemplar = ejemplar;

          let _email = _reservacion['email'];
          let _user = _reservacion['users'][0];
          let i = _email.indexOf('@');
          let email = _email.split(0, i);
          let estudiante = email.indexOf('.') == -1;

          let prestamista = new Prestamista;
          prestamista.id = _user['userId'];
          prestamista.nombre = _reservacion['userName'];
          prestamista.carnet = estudiante ? email.toUpperCase() : null;
          reservacion.prestamista = prestamista;

          reservacion.activa = _reservacion['RelatedId']? true : false;

          reservaciones.push(reservacion);
        });
        return reservaciones;
      }
    );
  }

  // Método: prestar
  // Objetivo: Confirmar el préstamo de una reservación
  prestar(reservacion: Reservacion): Observable<string> {
    let url = this.baseUrl + '/transactions/loans';

    let q = JSON.stringify({
      copies: [reservacion.ejemplar.id],
      details: { bookTitle: reservacion.ejemplar.titulo, lenderName: reservacion.prestamista.nombre, returnDate: reservacion.fechaDevolucion, userId: reservacion.prestamista.id },
      transactionId: reservacion.id
    });

    return this.http.put(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }

  // Método: cancelar
  // Objetivo: Cancelar una reservación
  cancelar(reservacion: Reservacion): Observable<string> {
    let url = this.baseUrl + '/transactions/annulments';

    let q = JSON.stringify({
      copies: [reservacion.ejemplar.id],
      transactionId: reservacion.id
    });

    return this.http.put(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }
}
