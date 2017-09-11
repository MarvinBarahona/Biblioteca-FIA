/*
*Nombre del módulo: Gestión de ejemplares
*Dirección física: src\app\ejemplares\componentes\ejemplar-buscar.component.ts
*Objetivo: Buscar ejemplares por medio del código de barra
**/

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './ejemplar-buscar.component.html',
  styles: [`
      .search {
        margin-top:25px;
        left: -25px;
      }
      `]
})
export class EjemplarBuscarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
