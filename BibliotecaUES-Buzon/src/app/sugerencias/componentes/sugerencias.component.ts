/*
*Nombre del módulo: Consulta de sugerencias
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
    this.criterioBusqueda = '0';
    this.sugerenciasService.top10().subscribe(
      sugerencias => {
        this.sugerencias = sugerencias;
      }
    );

  }

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

    this.sugerenciasService.buscar(key, this.textoBusqueda).subscribe(
      sugerencias => {
        this.sugerencias = sugerencias;
      }
    );
  }

  linkSugerencia(id: string){
    let docente = JSON.parse(sessionStorage.getItem('usuario'))['grupo'] == "Docente";
    if(docente) this.router.navigate(['/sugerencias/pedir/' + id]);
    else this.router.navigate(['/sugerencias/votar/' + id]);
  }

  linkCrear(){
    let docente = JSON.parse(sessionStorage.getItem('usuario'))['grupo'] == "Docente";
    if(docente) this.router.navigate(['/sugerencias/nueva/docente']);
    else this.router.navigate(['/sugerencias/nueva/estudiante']);
  }

}
