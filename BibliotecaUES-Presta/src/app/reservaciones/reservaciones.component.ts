/*
*Nombre del componente: reservaciones
*Dirección física: src/app/prestamos/componentes/reservaciones.component.ts
*Objetivo: Mostrar el listado de reservaciones y permitir el préstamo o cancelación.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { DatepickerOptions } from 'ng2-datepicker';

import { ReservacionesService, Reservacion } from './servicios';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './reservaciones.component.html',
  styles: [`
    #modalP{
      height: 450px;
      width: 900px;
    }

    #modalC{
      height: 250px;
      width: 600px;
    }
  `]
})

export class ReservacionesComponent implements OnInit {
  reservaciones: Reservacion[];
  reservacion: Reservacion;
  carnet: string;
  fechaDevolucion: Date;
  hoy: Date;
  codigo: string;

  modalPrestar = new EventEmitter<string | MaterializeAction>();
  modalCancelar = new EventEmitter<string | MaterializeAction>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dpOptions: DatepickerOptions = {};

  constructor(
    private router: Router,
    private reservacionesService: ReservacionesService,
    private pdfmake: PdfmakeService
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

    this.dpOptions = {
      minYear: 2017,
      maxYear: 2025,
      displayFormat: 'DD/MM/YYYY',
      barTitleFormat: 'MMMM YYYY'
    }
  }

  ngOnInit(): void {
    // Activar el nav en responsive.
    $("#toogle_menu").sideNav({ closeOnClick: true });

    // Inicializar la fecha de devolución
    this.fechaDevolucion = new Date;

    // Cargar las reservaciones
    this.reservacionesService.obtenerTodas().subscribe(
      reservaciones => {
        this.reservaciones = reservaciones;
        this.dtTrigger.next();
      }
    );
  }

  //Método: prestar
  //Objetivo: Confirmar el préstamo de un libro
  prestar() {
    this.hoy = new Date;
    if (this.carnet == null || this.fechaDevolucion == null) {
      Materialize.toast("Hay campos vacios", 3000, "toastError");
    }
    else if (this.carnet.toUpperCase() != this.reservacion.prestamista.carnet) {
      Materialize.toast("El carnet no coincide con el del prestamista", 3000, "toastError");
    }
    else {
      if (this.fechaDevolucion <= this.hoy) {
        Materialize.toast("La fecha de devolución debe ser mayor a la de hoy", 3000, "toastError");
      }
      else {
        this.reservacion.fechaDevolucion = this.fechaDevolucion;
        this.reservacionesService.prestar(this.reservacion).subscribe(
          msg => {
            this.crearPdf(this.reservacion);
            Materialize.toast("Préstamo registrado", 3000, "toastSuccess");
            this.closePrestar();
            let i = this.reservaciones.indexOf(this.reservacion);
            if (i > -1) this.reservaciones.splice(i, 1);

            // Restaura los valroes iniciales
            this.fechaDevolucion = new Date;
            this.carnet = null;
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

  //Método: crearPfd
  //Objetivo: Crear el pdf del comprobante del préstamo
  crearPdf(reservacion: Reservacion){
    // Configurando las fuentes
    this.pdfmake.configureStyles({ header: { fontSize: 13, bold: true } });

    // Resetar el contenido de la página
    this.pdfmake.docDefinition.content = [];

    // COnfigurar el tamaño y orientación de la páginas
    this.pdfmake.docDefinition.pageSize = "A5";
    this.pdfmake.docDefinition.pageOrientation = 'landscape';

    // Agregando encabezados
    this.pdfmake.addText('Universidad de El Salvador', 'header');
    this.pdfmake.addText('Biblioteca de Ingeniería y Arquitectura', 'header');
    this.pdfmake.addText('\n\n');

    // Agregando el cuerpo del comprobante
    this.pdfmake.addText('Prestamista: ' + reservacion.prestamista.nombre + ' (' + reservacion.prestamista.carnet + ')');
    this.pdfmake.addText('\n');
    this.pdfmake.addText('Título: ' + reservacion.ejemplar.titulo + ' (' + reservacion.ejemplar.codigo + ')');
    this.pdfmake.addText('\n');
    this.pdfmake.addText('Fecha y hora del préstamo: ' + this.hoy.toLocaleDateString() + ', ' + this.hoy.toLocaleTimeString());
    this.pdfmake.addText('\n');
    this.pdfmake.addText('Fecha de devolución: ' + reservacion.fechaDevolucion.toLocaleDateString());

    // Imprimir el comprobante
    this.pdfmake.download("Comprobante " +this.carnet.toUpperCase() +  " - "+ this.codigo);
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
