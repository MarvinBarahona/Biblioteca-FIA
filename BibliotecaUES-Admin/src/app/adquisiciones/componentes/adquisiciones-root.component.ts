/*
*Nombre del módulo: Gestión de adquisiciones
*Dirección física: src\app\adquisiciones\componentes\dquisiciones-root.ts
*Objetivo: Formar la estructura base para los componentes de Adquisiciones
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './adquisiciones-root.component.html',
  styleUrls: ['./adquisiciones-root.component.css']
})
export class AdquisicionesRootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }

}
