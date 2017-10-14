/*
*Nombre del componente: sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencias.component.ts
*Objetivo: Mostrar el listado de sugerencias más recientes
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SugerenciasService, Sugerencia } from './../servicios';

@Component({
  templateUrl: './sugerencias.component.html',
  styles: [`
    .sugerencia{
      border: 1px solid;
      margin-top: 10px;
    }
  `]
})
export class SugerenciasComponent implements OnInit {
  sugerencias: Sugerencia[];
  textoBusqueda: string;
  criterioBusqueda: string;

  constructor(private sugerenciasService: SugerenciasService, private router: Router) {}

  ngOnInit(): void {
    // Asignar el criterio de búsqueda por defecto.
    this.criterioBusqueda = '0';

    // Recuperar las 10 sugerencias con más votos
    this.sugerenciasService.top10().subscribe(
      sugerencias => {
        this.sugerencias = sugerencias;
      }
    );

  }

  //Método: buscar
  //Objetivo: Buscar sugerencias que cumplan con el cirterio ingresado
  buscar(){
    this.sugerencias = null;
    let key;
    switch(this.criterioBusqueda){
      case '0': {
        key = 'title';
        break;
      }
      case '1': {
        key = 'isbn';
        break;
      }
      case '2': {
        key = 'code';
        break;
      }
      default:{}
    }

    // Consumir servicio de búsqueda
    this.sugerenciasService.buscar(key, this.textoBusqueda).subscribe(
      sugerencias => {
        this.sugerencias = sugerencias;
      }
    );
  }

  //Método: linkSugerencia
  //Objetivo: redirigir a la vista de sugerencia
  linkSugerencia(id: string){
    let docente = JSON.parse(sessionStorage.getItem('usuario'))['grupo'] == "Docente";
    if(docente) this.router.navigate(['/sugerencias/pedir/' + id]);
    else this.router.navigate(['/sugerencias/votar/' + id]);
  }

  //Método: linkCrear
  //Objetivo: Redirige a la creación de una sugerencia
  linkCrear(){
    let docente = JSON.parse(sessionStorage.getItem('usuario'))['grupo'] == "Docente";
    if(docente) this.router.navigate(['/sugerencias/nueva/docente']);
    else this.router.navigate(['/sugerencias/nueva/estudiante']);
  }

}
