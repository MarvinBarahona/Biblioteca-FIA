/*
*Nombre del componente: descartes-root
*Dirección física: src/app/descartes/componentes/descartes-root.component.ts
*Objetivo: Formar la estructura base para los componentes de Descartes
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './descartes-root.component.html'
})
export class DescartesRootComponent implements OnInit {

  ngOnInit() {
    // Cerrar el menú al darle click a una opción.
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
