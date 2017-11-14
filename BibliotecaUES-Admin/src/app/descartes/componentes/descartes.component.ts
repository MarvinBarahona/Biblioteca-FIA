/*
*Nombre del componente: descartes
*Dirección física: src/app/descartes/componentes/descartes.component.ts
*Objetivo: Mostrar el listado de descartes realizados
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { DescartesService, Descarte } from './../servicios';

declare var $: any;

@Component({
  templateUrl: './descartes.component.html'
})

export class DescartesComponent implements OnInit {
  descartes: Descarte[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private descartesService: DescartesService
  ) {
    // Para el sorting de las fechas.
    $.fn.dataTable.moment( 'DD/MM/YYYY' );

    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      order: [[2, "desc"]],
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
    // Llamar al servicio
    this.descartesService.obtenerTodos().subscribe(
      descartes => {
        // Asignar los intercambios y refrescar la tabla;
        this.descartes = descartes;
        this.dtTrigger.next();
      }
    );
  }
}
