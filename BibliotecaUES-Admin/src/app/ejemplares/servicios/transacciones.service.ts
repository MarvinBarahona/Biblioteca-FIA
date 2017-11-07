/*
*Nombre del servicio: ejemplares
*Dirección: /src/app/ejemplares/servicios/transacciones.service.ts
*Objetivo: Provee los servicios de transacciones al módulo de ejemplares
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Ejemplar, NuevoEjemplar, Transaccion} from './';

@Injectable()
export class TransaccionesService {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: retirar
  // Objetivo: Confirmar el retiro de un ejemplar
  retirar(ejemplar: Ejemplar, motivo: string): Observable<string> {
    let url = this.baseUrl + '/transactions/retirement';

    let q = JSON.stringify({
      copies: [ejemplar.id],
      notes: motivo
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }

  // Método: registrarPercance
  // Objetivo: registrar el percance (daño o extravío) sobre un ejemplar
  registrarPercance(ejemplar: Ejemplar, transaccionAnterior: Transaccion, tipo: string): Observable<string> {
    let url;
    if(tipo == "Daño") url = this.baseUrl + '/transactions/damages';
    if(tipo == "Extravío") url = this.baseUrl + '/transactions/losses';

    let q = JSON.stringify({
      copies: [ejemplar.id],
      transactionId: transaccionAnterior.id,
      details: {
        bookTitle: ejemplar.libro.titulo,
        bookEdition: ejemplar.libro.edicion,
        userId: transaccionAnterior.detalles.userId
      }
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }

  // Método: restaurar
  // Objetivo: confirmar la restauración de un ejemplar
  restaurar(ejemplar: Ejemplar, transaccionAnterior: Transaccion): Observable<string> {
    let url = this.baseUrl + '/transactions/restores';

    let q = JSON.stringify({
      copies: [ejemplar.id],
      transactionId: transaccionAnterior.id,
      details: {
        userId: transaccionAnterior.detalles.userId
      }
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }

  // Método: exonerar
  // Objetivo: confirmar la exoneración de un prestamista
  exonerar(ejemplar: Ejemplar, transaccionAnterior: Transaccion): Observable<string> {
    let url = this.baseUrl + '/transactions/exonerations';

    let q = JSON.stringify({
      copies: [ejemplar.id],
      transactionId: transaccionAnterior.id,
      details: {
        userId: transaccionAnterior.detalles.userId
      }
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }

  // Método: sustituir
  // Objetivo: confirmar la sustitución de un ejemplar
  sustituir(ejemplar: Ejemplar, transaccionAnterior: Transaccion, nuevoEjemplar: NuevoEjemplar): Observable<string> {
    let url = this.baseUrl + '/transactions/restores';

    let q = JSON.stringify({
      substitution:{
        copies: [ejemplar.id],
        transactionId: transaccionAnterior.id,
        notes: "Sustituido por ejemplar " + nuevoEjemplar.codigo,
        details: {
          userId: transaccionAnterior.detalles.userId
        }
      },
      replacement:{
        notes: "Reposición del ejemplar " + ejemplar.codigo,
        copies: [{
          bookId: nuevoEjemplar.libro.id,
          quantity: 1,
          barcode: nuevoEjemplar.codigo
        }],
        details:{
          copyId: ejemplar.id
        }
      }
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      res => res.json()
    );
  }
}
