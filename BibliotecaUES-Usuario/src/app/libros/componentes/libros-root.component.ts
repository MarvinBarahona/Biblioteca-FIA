/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\.component.ts
*Objetivo: Formar la estructura base para los componentes de Libros
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './libros-root.component.html'
})
export class LibrosRootComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
