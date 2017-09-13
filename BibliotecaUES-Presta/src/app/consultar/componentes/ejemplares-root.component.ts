/*
*Nombre del módulo: Gestión de ejemplares
*Dirección física: src\app\ejemplares\componentes\ejemplares-root.component.ts
*Objetivo: Formar la estructura base para los componentes de Ejemplares
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './ejemplares-root.component.html',
  styleUrls: ['./ejemplares-root.component.css']
})
export class EjemplaresRootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }

}
