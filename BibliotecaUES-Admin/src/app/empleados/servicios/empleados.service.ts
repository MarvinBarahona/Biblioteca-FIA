/*
*Nombre del servicio: empleados
*Dirección: /src/app/empleados/servicios/empleados.service.ts
*Objetivo: Proveer los servicios de empleados al módulo de empleados.
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';

import { CookieService } from 'ngx-cookie';
import { Empleado, Politica, Grupo } from './';

@Injectable()
export class EmpleadosService {
  baseUrl: string;
  headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {
    this.baseUrl = environment.apiURL;
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  // Método: crear
  // Objetivo: crear un nuevo empleado.
  crear(empleado: Empleado): Observable<string> {
    let url = this.baseUrl + "/users"

    // Mapeando la entrada
    let q = JSON.stringify({email: empleado.correo, fullname: empleado.nombre, group: empleado.grupo.id});

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
  // Objetivo: obtener todos los empleados
  obtenerTodos(): Observable<Empleado[]> {
    let url = this.baseUrl + "/users"

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();
        let empleados = new Array<Empleado>();

        r.forEach((_empleado)=>{
          // Mapeando objeto Empleado
          let empleado = new Empleado;
          empleado.id = _empleado['id'];
          empleado.nombre = _empleado['fullname'];
          empleado.correo = _empleado['email'];

          // Mapeando objeto Grupo de Empleado
          let rg = _empleado['Group'];
          let grupo = new Grupo;
          grupo.nombre = rg['name'];
          empleado.grupo = grupo;

          // Agregando a la respuesta
          empleados.push(empleado);
        });

        return empleados;
      }
    );
  }

  // Método: obtener
  // Objetivo: obtener un empleado dado su id, para asignarle permisos.
  obtener(id: number): Observable<Empleado>{
    let url = this.baseUrl + "/users/" + id;

    // Realizando GET
    return this.http.get(url, { headers: this.headers }).map(
      // Mapeando salida
      (response: Response) => {
        let r = response.json();

        // Mapeando objeto
        let empleado = new Empleado;
        empleado.id = r['id'];
        empleado.nombre = r['fullname'];
        empleado.correo = r['email'];

        // Mapeando el grupo
        let grupo = new Grupo;
        grupo.nombre = r['Group'];
        empleado.grupo = grupo;

        // Mapeando politicas
        let politicas = new Array<Politica>();
        let rp = r['Policies'];

        rp.forEach((_politica)=>{
          let politica = new Politica;
          politica.id = _politica['id'];
          politica.codigo = _politica['code'];
          politica.nombre = _politica['name'];
          politica.asignada = _politica['hasIt'];
          politica.deshabilitada = _politica['group'];

          politicas.push(politica);
        });
        empleado.politicas = politicas;

        return empleado;
      }
    );
  }

  // Método: asignarPoliticas
  // Objetivo: asignar politicas a un empleado
  asignarPoliticas(empleado: Empleado): Observable<string>{
    let url = this.baseUrl + "/users/" + empleado.id + "/setPolicies";

    // Creando arreglo de politicas a asignarPoliticas
    let politicas = [];
    empleado.politicas.forEach((politica) => {
      if(!politica.deshabilitada && politica.asignada) politicas.push(politica.id);
    });

    // Mapeando la entrada
    let q = JSON.stringify({policies: politicas});

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
