/*
*Nombre del servicio: prestamos
*Dirección física: src/app/prestamos/servicios/prestamos.service.ts
*Objetivo: Proveer los servicios de préstamos al módulo prestamos
**/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Transaccion } from './';

@Injectable()
export class PrestamosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: devolucion
  // Objetivo: Confirmar la devolución de un préstamo
  devolucion(prestamo: Transaccion): Observable<string> {
    let url = this.baseUrl + '/transactions/returns';

    let q = JSON.stringify({
      copies: [prestamo.ejemplar.id],
      details: { userId: prestamo.prestamista.id },
      transactionId: prestamo.id
    });

    return this.http.put(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }

  // Método: renovacion
  // Objetivo: Confirmar la renovación de un préstamo
  renovacion(prestamo: Transaccion): Observable<string> {
    let url = this.baseUrl + '/transactions/renewals';

    let q = JSON.stringify({
      copies: [prestamo.ejemplar.id],
      details: { bookTitle: prestamo.ejemplar.libro.titulo, lenderName: prestamo.prestamista.nombre, returnDate: prestamo.fechaDevolucion, userId: prestamo.prestamista.id },
      transactionId: prestamo.id
    });

    return this.http.put(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }
}
