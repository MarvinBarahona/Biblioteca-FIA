/*
*Nombre del componente: sugerencias
*Dirección física: src/app/sugerencias/componentes/sugerencias.component.ts
*Objetivo: Mostrar el lsitado de sugerencias.
**/


import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { SugerenciasService, Sugerencia } from './../servicios';

declare var $: any;

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
  sugerencias: Sugerencia[];

  modalFinalizar = new EventEmitter<string | MaterializeAction>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private sugerenciasService: SugerenciasService
  ) {
    // Opciones del datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
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
    // Inicializando Tabs
    $('ul.tabs').tabs();

    // Llamar al servicio
    this.sugerenciasService.obtenerTodos().subscribe(
      sugerencias => {
        // Asignar los percances y refrescar la tabla;
        this.sugerencias = sugerencias;
        this.dtTrigger.next();
      }
    );
  }

  // Método: filtradas
  // Objetivo: Obtiene sugerencias filtradas por su estado
  filtradas(estado: string){
    let r = this.sugerencias? this.sugerencias.filter((sugerencia) => {return sugerencia.estado == estado}) : null;
    if( r && r.length == 0) r = null;
    return r;
  }

  // Métodos para la ventana modal de confirmación de cierre de ciclo
  openFinalizar(incidente: string) {
    this.modalFinalizar.emit({ action: "modal", params: ['open'] });
  }
  closeFinalizar() {
    this.modalFinalizar.emit({ action: "modal", params: ['close'] });
  }

  // Método: reportar
  // Objetivo: Reportar el ejemplar.
  finalizar() {
    this.closeFinalizar();
  }
}
