import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';
import { Adquisicion, NuevaAdquisicion, Ejemplar, Libro } from './';

@Injectable()
export class AdquisicionesService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crear
  // Objetivo: crear una nueva compra o donación de ejemplares en lote.
  crear(nuevaAdquisicion: NuevaAdquisicion): Observable<string> {
    let t = nuevaAdquisicion.tipo == "Compra" ? 'purchase' : 'donation';
    let url = this.baseUrl + '/transactions/' + t;

    // Mapeando la entrada
    let ejemplares = [];
    nuevaAdquisicion.ejemplares.forEach(function(ejemplar){
      ejemplares.push({id: ejemplar.libro.id, quantity: ejemplar.cantidad});
    });

    let detalles = nuevaAdquisicion.donante ? {donante: nuevaAdquisicion.donante} : null;

    let q = JSON.stringify({ notes: nuevaAdquisicion.nombre, copies: ejemplares, details: detalles });

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  // Método: catalogar
  // Objetivo: asignar códigos de barra a los ejemplares de una adquisición.
  catalogar(ejemplares: Ejemplar[]): Observable<string>{
    let url = this.baseUrl + '/copies/massCataloging';

    // Mapeando la entrada.
    let copies = [];
    ejemplares.forEach(function(ejemplar){
      copies.push({id: ejemplar.id, barcode: ejemplar.codigo});
    });

    let q = JSON.stringify({copies: copies});

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        return r['message'];
      }
    );
  }

  // Método: obtenerTodos
  // Objetivo: obtener todas las adquisiciones existentes.
  obtenerTodos(): Observable<Adquisicion[]> {
    let url = this.baseUrl + '/copies/lots?type=1';

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let adquisiciones = new Array<Adquisicion>();

        r.forEach(function(item) {
          let adquisicion = new Adquisicion;
          adquisicion.id = item['id'];
          adquisicion.nombre = item['notes'];
          adquisicion.fecha = item['createdAt'];
          adquisicion.tipo = item['type'];
          adquisicion.usuario = item['fullname'];
          adquisiciones.push(adquisicion);
        });

        return adquisiciones;
      }
    );
  }

  // Método: obtener
  // Objetivo: obtener una adquisición
  obtener(id: number): Observable<Adquisicion> {
    let url = this.baseUrl + '/transactions/' + id;

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando la salida
      (response: Response) => {
        let r = response.json();
        let adquisicion = new Adquisicion;
        let rt = r[0];
        let rd = rt['details'];
        let rc = rt['copies'];

        // Mapear el objeto de adquisicion
        adquisicion.id = rt['id'];
        adquisicion.nombre = rt['notes'];
        adquisicion.tipo = rt['type'];
        adquisicion.usuario = rt['fullname'];
        adquisicion.fecha = rt['createdAt'];
        adquisicion.donante = rd['donante'];

        // Mapear las ejemplares.
        let ejemplares = new Array<Ejemplar>();
        rc.forEach(function(item){
          let ejemplar = new Ejemplar;
          ejemplar.id = item['id'];
          ejemplar.codigo = item['barcode'];
          ejemplar.estado = item['state'];

          // Mapear el libro
          let rb = item['book'];
          let libro = new Libro;
          libro.id = rb['id'];
          libro.titulo = rb['title'];
          libro.edicion = rb['edition'];
          ejemplar.libro = libro;

          ejemplares.push(ejemplar);
        });
        adquisicion.ejemplares = ejemplares;

        return adquisicion;
      }
    );
  }
}
