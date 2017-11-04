/*
*Nombre del componente: descarte-nuevo
*Dirección física: src/app/descarte/componentes/descarte-nuevo.component.ts
*Objetivo: Realizar el descarte de uno o varios ejemplares
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

// import {  } from './../servicios';

declare var $: any;

@Component({
  templateUrl: './descarte-nuevo.component.html'
})

export class DescarteNuevoComponent implements OnInit {

  modalCancel = new EventEmitter<string | MaterializeAction>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
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

  }

  // Métodos para el manejo de la ventana modal de confirmación de cancelación.
  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }

  // Método: cancel
  // Objetivo: Cerrar la ventana modal y retornar a la vista anterior.
  cancel() {
    this.closeCancel();
    this.router.navigate(['/descartes']);
  }
}
