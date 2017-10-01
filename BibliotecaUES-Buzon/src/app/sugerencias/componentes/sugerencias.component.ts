/*
*Nombre del módulo: Consulta de sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencias.component.ts
*Objetivo: Mostrar el listado de sugerencias más recientes
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SugerenciasService, Sugerencia } from './../servicios';

@Component({
  templateUrl: './sugerencias.component.html'
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
        key = 'subjectCode';
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

}
