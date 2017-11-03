/*
*Nombre del componente: ejemplar
*Dirección física: src\app\ejemplares\componentes\ejemplar.component.ts
*Objetivo: Mostrar información de un ejemplar específico
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Subject } from 'rxjs/Rx';

import { EjemplaresService, Ejemplar, Transaccion } from './../servicios'

declare var $: any;

@Component({
  templateUrl: './ejemplar.component.html'
})
export class EjemplarComponent implements OnInit {
  ejemplar: Ejemplar;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  modalRetirar = new EventEmitter<string|MaterializeAction>();

  constructor(
    private ejemplarService: EjemplaresService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Para el sorting de las fechas.
    $.fn.dataTable.moment( 'DD/MM/YYYY' );

    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      // order: [[1, "desc"]],
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

  ngOnInit() {
    // Obtiene el id del ejemplar
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.ejemplarService.obtener(id).subscribe(
      ejemplar => {
        this.ejemplar = ejemplar;
        this.dtTrigger.next();
      },
      error => {
        //Si el ejemplar no existe
        if (error.status == 404) {
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

  // Métodos para la ventana modal de confirmación de retiro
  openRetirar() {
    this.modalRetirar.emit({action:"modal",params:['open']});
  }
  closeRetirar() {
    this.modalRetirar.emit({action:"modal",params:['close']});
  }

  // Método: retirar
  // Objetivo: Retirar el ejemplar.
  retirar(){
    this.closeRetirar();
  }
}
