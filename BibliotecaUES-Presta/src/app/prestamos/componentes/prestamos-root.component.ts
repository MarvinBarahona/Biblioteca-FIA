/*
*Nombre del componente: prestamos-root
*Dirección física: src/app/prestamos/componentes/prestamos-root.component.ts
*Objetivo: Formar la estructura base para los componentes de préstamo
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './prestamos-root.component.html',
})
export class PrestamosRootComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
