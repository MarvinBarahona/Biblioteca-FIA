/*
*Nombre del componente: prestamos
*Dirección física: src/app/prestamos/componentes/prestamos.component.ts
*Objetivo: Buscar un ejemplar prestado y devolverlo o renovarlo.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

// import {  }  from './servicios';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './prestamos.component.html',
  styles: [`
    .search{
      margin-top: 20px;
      left:-20px;
    }
  `]
})

export class PrestamosComponent implements OnInit {
  modalRenovar = new EventEmitter<string | MaterializeAction>();

  constructor(
    private router: Router) { }

  ngOnInit() {
    // Activar el nav en responsive.
    $("#toogle_menu").sideNav({ closeOnClick: true });

    //Inicializar Date picker
    $('.datepicker').pickadate({
      monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
  }

  // Métodos para el manejo de la ventana modal de renovación.
  openRenovar() {
    this.modalRenovar.emit({ action: "modal", params: ['open'] });
  }
  closeRenovar() {
    this.modalRenovar.emit({ action: "modal", params: ['close'] });
  }

}
