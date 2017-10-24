/*
*Nombre del módulo: adquisiciones
*Dirección física: src\app\adquisiciones\componentes\adquisiciones.component.ts
*Objetivo: Mostrar una tabla con las diferentes adquisiciones
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { AdquisicionesService, Adquisicion } from './../servicios';

declare var $: any;

@Component({
  templateUrl: './adquisiciones.component.html'
})

export class AdquisicionesComponent implements OnInit {
  adquisiciones: Adquisicion[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private adquisicionesService: AdquisicionesService,
    private router: Router
  ) {
    // Para el sorting de las fechas. 
    $.fn.dataTable.moment( 'DD/MM/YYYY' );

    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      order: [[3, "desc"], [0, "asc"]],
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

  ngOnInit(): void {
    // Llama al servicio
    this.adquisicionesService.obtenerTodos().subscribe(
      adquisiciones => {
        // Asigna las adquisiciones y refresca la tabla
        this.adquisiciones = adquisiciones;
        this.dtTrigger.next();
      }
    );
  }
}
