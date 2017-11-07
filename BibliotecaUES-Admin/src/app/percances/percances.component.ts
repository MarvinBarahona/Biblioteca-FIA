/*
*Nombre del componente: percances
*Dirección física: src/app/percances/componentes/percances.component.ts
*Objetivo: Mostrar el listado de ejemplares reportados como dañados o extraviados
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { PercancesService, Percance } from './servicios';

declare var $: any;

@Component({
  templateUrl: './percances.component.html'
})

export class PercancesComponent implements OnInit {
  percances: Percance[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private percancesService: PercancesService
  ) {
    // Para el sorting de las fechas.
    $.fn.dataTable.moment( 'DD/MM/YYYY' );

    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      order: [[4, "asc"], [3, "desc"]],
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
    this.percancesService.obtenerTodos().subscribe(
      percances => {
        // Asignar los percances y refrescar la tabla;
        this.percances = percances;
        this.dtTrigger.next();
      }
    );
  }
}
