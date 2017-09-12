/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\catalogado.component.ts
*Objetivo: Muestra la información catalogada de un libro
**/

import { Component, OnInit, Input } from '@angular/core';

import { Catalogo } from './../servicios';

@Component({
  selector: 'catalogado',
  templateUrl: './catalogado.component.html',
  styles: [`
      .previa {
        width: 150px;
        height: 206px;
        margin-top:5px;
      }
      `]
})
export class CatalogadoComponent implements OnInit {
  @Input() catalogo: Catalogo;
  constructor() { }

  ngOnInit() {
  }

}
