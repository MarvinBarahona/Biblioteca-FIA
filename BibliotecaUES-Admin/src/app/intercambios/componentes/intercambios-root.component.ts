/*
*Nombre del componente: intercambios-root
*Dirección física: src\app\intercambios\componentes\intercambios-root.component.ts
*Objetivo: Formar la estructura base para los componentes de intercambios
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './intercambios-root.component.html'
})
export class IntercambiosRootComponent implements OnInit {
  ngOnInit() {
    // Cerrar el menú al darle click a una opción.
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
