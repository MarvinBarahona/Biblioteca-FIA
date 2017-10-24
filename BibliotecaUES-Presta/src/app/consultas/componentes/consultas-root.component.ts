/*
*Nombre del componente: consultas-root
*Dirección física: src\app\consultas\componentes\consultas-root.component.ts
*Objetivo: Formar la estructura base para los componentes de consultas
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './consultas-root.component.html',
})
export class ConsultasRootComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
