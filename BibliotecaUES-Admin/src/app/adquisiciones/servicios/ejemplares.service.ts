import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Ejemplar } from './';

@Injectable()
export class EjemplaresService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: catalogar
  // Objetivo: asignar códigos de barra a los ejemplares de una adquisición.
  catalogar(ejemplares: Ejemplar[]): Observable<string>{
    let url = this.baseUrl + '/copies/massCataloging';

    // Mapeando la entrada.
    let copies = [];
    ejemplares.forEach(function(ejemplar){
      if(!ejemplar.ingresado && ejemplar.codigo) copies.push({id: ejemplar.id, barcode: ejemplar.codigo});
    });

    let q = JSON.stringify({copies: copies});

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        return "guardados";
      }
    );
  }
}
