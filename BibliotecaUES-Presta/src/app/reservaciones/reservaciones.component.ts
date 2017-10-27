/*
*Nombre del componente: reservaciones
*Dirección física: src/app/prestamos/componentes/reservaciones.component.ts
*Objetivo: Mostrar el listado de reservaciones y permitir el préstamo o cancelación.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { ReservacionesService, Reservacion } from './servicios';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './reservaciones.component.html',
  styles: [`
    .modal{
      heigth: 400px;
      weigth: 200px;
    }
  `]
})

export class ReservacionesComponent implements OnInit {
  reservaciones: Reservacion[];
  reservacion: Reservacion;
  carnet: string;
  fechaDevolucion: string;
  hoy: Date;
  codigo: string;

  modalPrestar = new EventEmitter<string | MaterializeAction>();
  modalCancelar = new EventEmitter<string | MaterializeAction>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private reservacionesService: ReservacionesService,
  ) {
    // Para el sorting de las fechas.
    $.fn.dataTable.moment('DD/MM/YYYY hh:mm');

    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      order: [[2, "asc"]],
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

    this.hoy = new Date;

    // Cargar las reservaciones
    this.reservacionesService.obtenerTodas().subscribe(
      reservaciones => {
        this.reservaciones = reservaciones;
        this.dtTrigger.next();
      }
    );
  }

  //Método: presta
  //Objetivo: Confirmar el préstamo de un libro
  prestar() {
    if (this.carnet == null || this.fechaDevolucion == null) {
      Materialize.toast("Hay campos vacios", 3000, "toastError");
    }
    else if (this.carnet != this.reservacion.prestamista.carnet) {
      Materialize.toast("El carnet no coincide con el del prestamista", 3000, "toastError");
    }
    else {
      let fecha = new Date(this.fechaDevolucion + " 0:00")
      if (fecha <= this.hoy) {
        Materialize.toast("La fecha de devolución debe ser mayor a la de hoy", 3000, "toastError");
      }
      else {
        this.reservacion.fechaDevolucion = fecha;
        this.reservacionesService.prestar(this.reservacion).subscribe(
          msg => {
            this.closePrestar();
            Materialize.toast("Préstamo registrado", 3000, "toastSuccess");
            let i = this.reservaciones.indexOf(this.reservacion);
            if (i > -1) this.reservaciones.splice(i, 1);
          },
          error => {
            Materialize.toast("Error al registrar el préstamo", 3000, "toastError");
          }
        );
      }
    }

  }

  //Método: cancelar
  //Objetivo: Cancelar la reservación de un ejemplar
  cancelar() {
    this.reservacionesService.cancelar(this.reservacion).subscribe(
      msg => {
        this.closeCancelar();
        Materialize.toast("Reservación cancelada", 3000, "toastSuccess");
        let i = this.reservaciones.indexOf(this.reservacion);
        if (i > -1) this.reservaciones.splice(i, 1);
      },
      error => {
        Materialize.toast("Error al cancelar la reservación", 3000, "toastError");
      }
    );
  }

  // Métodos para el manejo de la ventana modal de préstamos.
  openPrestar(reservacion: Reservacion) {
    this.reservacion = reservacion;
    this.codigo = this.reservacion.ejemplar.codigo;
    this.modalPrestar.emit({ action: "modal", params: ['open'] });
  }
  closePrestar() {
    this.modalPrestar.emit({ action: "modal", params: ['close'] });
  }

  // Métodos para el manejo de la ventana modal de cancelación de reservación
  openCancelar(reservacion: Reservacion) {
    this.reservacion = reservacion;
    this.modalCancelar.emit({ action: "modal", params: ['open'] });
  }
  closeCancelar() {
    this.modalCancelar.emit({ action: "modal", params: ['close'] });
  }
}
