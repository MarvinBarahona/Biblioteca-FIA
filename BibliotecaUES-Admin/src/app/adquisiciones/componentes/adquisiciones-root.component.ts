/*
*Nombre del componente: adquisiciones-root
*Dirección física: src\app\adquisiciones\componentes\dquisiciones-root.ts
*Objetivo: Formar la estructura base para los componentes de Adquisiciones
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './adquisiciones-root.component.html'
})
export class AdquisicionesRootComponent implements OnInit {

  ngOnInit() {
    // Cerrar el menú al darle click a una opción.
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
