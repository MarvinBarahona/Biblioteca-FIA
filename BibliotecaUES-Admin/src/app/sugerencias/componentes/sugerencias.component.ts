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
declare var Materialize: any;

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

  constructor(
    private router: Router,
    private sugerenciasService: SugerenciasService
  ) {
  }

  ngOnInit(): void {
    // Inicializando Tabs
    $('ul.tabs').tabs();

    // Llamar al servicio
    this.sugerenciasService.obtenerTodos().subscribe(
      sugerencias => {
        // Asignar los percances y refrescar la tabla;
        this.sugerencias = sugerencias;
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
    this.sugerenciasService.terminarCiclo().subscribe(
      (msg)=>{
        Materialize.toast("Ciclo terminado", 3000, 'toastSuccess');
        // Llamar al servicio
        this.sugerenciasService.obtenerTodos().subscribe(
          sugerencias => {
            // Asignar los percances y refrescar la tabla;
            this.sugerencias = sugerencias;
          }
        );
        this.closeFinalizar();
      },
      (error)=>{
        Materialize.toast("Error al terminar ciclo", 3000, 'toastError');
      }
    );
  }
}
