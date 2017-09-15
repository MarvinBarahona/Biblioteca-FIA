/*
*Nombre del módulo: Gestión de ejemplares
*Dirección física: src\app\ejemplares\componentes\ejemplares-root.component.ts
*Objetivo: Formar la estructura base para los componentes de Ejemplares
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './ejemplares-root.component.html'
})
export class EjemplaresRootComponent implements OnInit {
  ngOnInit() {
    // Cerrar el menú al darle click a una opción.
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
