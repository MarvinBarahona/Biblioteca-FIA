/*
*Nombre del componente: sugerencias
*Dirección física: src/app/sugerencias/componentes/sugerencias.component.ts
*Objetivo: Mostrar el lsitado de sugerencias.
**/


import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

// import {  } from './../servicios';

@Component({
  templateUrl: './sugerencias.component.html',
  styles: [`
    .modal{
      height: 250px;
      width: 350px;
    }
  `]
})
export class SugerenciasComponent implements OnInit {

  modalFinalizar = new EventEmitter<string|MaterializeAction>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private router: Router
  ) {
    // Opciones del datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10,15,20],
      order: [[3, 'asc']],
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

  // Métodos para la ventana modal de confirmación de cierre de ciclo
  openFinalizar(incidente: string) {
    this.modalFinalizar.emit({action:"modal",params:['open']});
  }
  closeFinalizar() {
    this.modalFinalizar.emit({action:"modal",params:['close']});
  }

  // Método: reportar
  // Objetivo: Reportar el ejemplar.
  finalizar(){
    this.closeFinalizar();
  }
}
