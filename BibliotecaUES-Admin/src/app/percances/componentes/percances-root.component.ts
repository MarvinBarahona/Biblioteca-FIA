/*
*Nombre del componente: PercancesRootComponent
*Dirección física: src/app/percances-root/componentes/PercancesRootComponent.component.ts
*Objetivo: Formar la estructura base para los componentes de Percances
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './percances-root.component.html'
})
export class PercancesRootComponent implements OnInit {
  ngOnInit() {
    // Cerrar el menú al darle click a una opción.
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
