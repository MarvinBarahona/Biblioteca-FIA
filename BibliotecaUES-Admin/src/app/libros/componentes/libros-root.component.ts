/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\libros-root.component.ts
*Objetivo: Formar la estructura base para los componentes de Libros
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './libros-root.component.html'
})
export class LibrosRootComponent implements OnInit {
  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
