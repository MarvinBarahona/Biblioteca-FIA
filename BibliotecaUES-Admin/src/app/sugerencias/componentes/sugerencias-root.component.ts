/*
*Nombre del componente: sugerencias-root
*Dirección física: src/app/sugerencias/componentes/sugerencias-root.component.ts
*Objetivo: Crear la estructura base para el módulo de sugerencias
**/

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './sugerencias-root.component.html'
})
export class SugerenciasRootComponent implements OnInit {
  ngOnInit() {
    // Cerrar el menú al darle click a una opción.
    $("#toogle_menu").sideNav({closeOnClick: true});
  }
}
