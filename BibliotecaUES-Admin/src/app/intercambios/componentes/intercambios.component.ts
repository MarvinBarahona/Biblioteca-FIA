/*
*Nombre del módulo: Intercambios
*Dirección física: src\app\intercambios\componentes\intercambios.component.ts
*Objetivo: Permite ver una tabla con todos los intercambios
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { Intercambio } from './../servicios/';

@Component({
  templateUrl: './intercambios.component.html'
})
export class IntercambiosComponent implements OnInit {
  intercambios: Intercambio[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: Router) {
    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10,15,20]
    };
  }

  ngOnInit() {
    this.intercambios = new Array<Intercambio>();
  }

  // Redirige a la vista de intercambio
  linkIntercambio(intercambio: Intercambio){
    this.router.navigate(["/intercambio/" + intercambio.id]);
  }

  // Redirige a la vista de registro de la entrada del intercambio
  linkEntrada(intercambio: Intercambio){
    this.router.navigate(["/intercambio/pendiente", {id: intercambio.id, facultad: intercambio.facultad}]);
  }

}
