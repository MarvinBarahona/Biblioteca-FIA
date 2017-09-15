/*
*Nombre del módulo: Gestión de empleados
*Dirección física: src\app\empleados\componentes\empleados-root.component.ts
*Objetivo: Formar la estructura base para los componentes de empleados
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './empleados-root.component.html'
})
export class EmpleadosRootComponent implements OnInit {
  ngOnInit() {
    // Cerrar el menú al darle click a una opción.
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
