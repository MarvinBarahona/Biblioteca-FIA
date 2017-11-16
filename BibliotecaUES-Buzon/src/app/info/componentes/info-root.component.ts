/*
*Nombre del componente: info-root
*Dirección física: src\app\info\componentes\info-root.component.ts
*Objetivo: Formar la estructura básica para los componentes de Info
**/
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  templateUrl: './info-root.component.html'
})
export class InfoRootComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
  }
}
