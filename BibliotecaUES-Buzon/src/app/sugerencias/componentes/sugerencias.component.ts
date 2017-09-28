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

  constructor(private sugerenciasService: SugerenciasService, private router: Router) {}

  ngOnInit(): void {
    this.sugerenciasService.top10().subscribe(
      sugerencias => {
        this.sugerencias = sugerencias;
      }
    );

  }

  buscar(){}

}
