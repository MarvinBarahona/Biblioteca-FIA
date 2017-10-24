/*
*Nombre del componente: intercambios
*Dirección física: src\app\intercambios\componentes\intercambios.component.ts
*Objetivo: Permite ver una tabla con todos los intercambios
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { IntercambiosService, Intercambio } from './../servicios/';

declare var $: any;

@Component({
  templateUrl: './intercambios.component.html'
})
export class IntercambiosComponent implements OnInit {
  intercambios: Intercambio[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private intercambiosService: IntercambiosService,
    private router: Router
  ) {
    // Para el sorting de las fechas
    $.fn.dataTable.moment( 'DD/MM/YYYY' );

    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      order: [[3, "asc"], [2, "desc"]],
      language: {
        "emptyTable": "Sin registros disponibles en la tabla",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "",
        "infoFiltered": "(filtrados de _MAX_ totales )",
        "lengthMenu": "Mostrando _MENU_ registros",
        "search": "Buscar:",
        "zeroRecords": "Búsqueda sin resultados",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      }
    };
  }

  ngOnInit() {
    // Llamar al servicio
    this.intercambiosService.obtenerTodos().subscribe(
      intercambios => {
        // Asignar los intercambios y refrescar la tabla;
        this.intercambios = intercambios;
        this.dtTrigger.next();
      }
    );
  }
}
