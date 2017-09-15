/*
*Nombre del módulo: Gestión de intercambios
*Dirección física: src\app\libros\componentes\intercambios-root.component.ts
*Objetivo: Formar la estructura base para los componentes de intercambios
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './intercambios-root.component.html'
})
export class IntercambiosRootComponent implements OnInit {
  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
