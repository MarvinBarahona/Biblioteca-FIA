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
      ejemplares.push({bookId: ejemplar.libro.id, quantity: ejemplar.cantidad});
    });

    let detalles = nuevaAdquisicion.tipo == "Compra" ? {} : {donante: nuevaAdquisicion.donante};

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
      if(!ejemplar.ingresado && ejemplar.codigo) copies.push({id: ejemplar.id, barcode: ejemplar.codigo});
    });

    let q = JSON.stringify({copies: copies});

    // Realizando POST
    return this.http.post(url, q, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        ejemplares.forEach(function(ejemplar){
          ejemplar.ingresado = ejemplar.codigo? true: false;
        });

        return "Datos almacenados";
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
        let a = response.json();
        let r1 = a[0];
        let r2 = a[1];
        let adquisiciones = new Array<Adquisicion>();

        r1.forEach(function(item) {
          let adquisicion = new Adquisicion;
          adquisicion.id = item['id'];
          adquisicion.nombre = item['notes'];
          adquisicion.fecha = item['createdAt'];
          adquisicion.tipo = item['type'];
          adquisicion.usuario = item['fullname'];
          adquisiciones.push(adquisicion);
        });

        r2.forEach(function(item) {
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
        let rd = r['details'];
        let rc = r['copies'];

        // Mapear el objeto de adquisicion
        adquisicion.id = r['id'];
        adquisicion.nombre = r['notes'];
        adquisicion.tipo = r['type'];
        adquisicion.usuario = r['userName'];
        adquisicion.fecha = r['createdAt'];
        adquisicion.donante = rd? rd['donante'] || null : null;

        // Mapear las ejemplares.
        let ejemplares = new Array<Ejemplar>();
        rc.forEach(function(item){
          let ejemplar = new Ejemplar;
          ejemplar.id = item['id'];
          ejemplar.codigo = item['barcode'];
          ejemplar.estado = item['state'];
          ejemplar.ingresado = ejemplar.codigo? true: false;

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
