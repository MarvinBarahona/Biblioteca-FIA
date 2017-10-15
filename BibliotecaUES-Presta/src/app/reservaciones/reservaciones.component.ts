/*
*Nombre del componente: reservaciones
*Dirección física: src/app/prestamos/componentes/reservaciones.component.ts
*Objetivo: Mostrar el listado de reservaciones y permitir el préstamo o cancelación.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

// import {  }  from './servicios';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './reservaciones.component.html'
})

export class ReservacionesComponent implements OnInit {
  modalPrestar = new EventEmitter<string | MaterializeAction>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private router: Router
  ) {

    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      order: [[2, "desc"], [0, "asc"]],
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
      // Activar el nav en responsive.
      $("#toogle_menu").sideNav({ closeOnClick: true });
  }

  // Métodos para el manejo de la ventana modal de préstamos.
  openPrestar() {
    this.modalPrestar.emit({ action: "modal", params: ['open'] });
  }
  closePrestar() {
    this.modalPrestar.emit({ action: "modal", params: ['close'] });
  }
}
