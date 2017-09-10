/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\catalogar.component.ts
*Objetivo: Catalogar un libro
**/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'catalogar',
  templateUrl: './catalogar.component.html',
  styles:[`
    .inicial {
      margin-top: 40px;
      text-align: right;
    }

    .final {
      margin-top: 40px;
      text-align: left;
    }

    .previa {
      width: 150px;
      height: 206px;
      margin-top:5px;
    }
    `]
})
export class CatalogarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chipsAutocomplete = {
    placeholder: "+ Materia",
    secondaryPlaceholder: 'Ingrese etiquetas',
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null,
        'Asia': null,
      },
      limit: Infinity,
      minLength: 1
    }
  };
}
