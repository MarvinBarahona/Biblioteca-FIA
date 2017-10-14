/*
*Nombre del componente: consultar-root
*Dirección física: src\app\consultar\componentes\consultar-root.component.ts
*Objetivo: Formar la estructura base para los componentes de consultar
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './consultar-root.component.html',
})
export class ConsultarRootComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
