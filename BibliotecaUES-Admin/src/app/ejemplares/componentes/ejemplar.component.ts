/*
*Nombre del componente: ejemplar
*Dirección física: src\app\ejemplares\componentes\ejemplar.component.ts
*Objetivo: Mostrar información de un ejemplar específico
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { Subject } from 'rxjs/Rx';

import { EjemplaresService, Ejemplar, Transaccion, NuevoEjemplar, Libro } from './../servicios'

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './ejemplar.component.html',
  styles: [`
    .btnSelect{
      margin-top: 40px;
      left: -60px!important;
    }
    #modal, #modal1{
      height: 250px;
      width: 350px;
    }
  `]
})
export class EjemplarComponent implements OnInit {
  ejemplar: Ejemplar;
  incidente: string;
  opcion: string;

  nuevoEjemplar: NuevoEjemplar;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  modalSeleccion = new EventEmitter<string | MaterializeAction>();
  modalRetirar = new EventEmitter<string|MaterializeAction>();
  modalReportar = new EventEmitter<string|MaterializeAction>();

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
      searching: false,
      order:[1, "asc"],
      ordering: false,
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
        this.ejemplar.estado = "Inhabilitado";
        setTimeout(()=>{this.dtTrigger.next();}, 500);
      },
      error => {
        //Si el ejemplar no existe
        if (error.status == 404) {
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

  // Método: onNotify
  // Objetivo: Escucha el evento emitido por el componente libro-seleccion
  onNotify(libro: Libro): void {
    this.nuevoEjemplar.libro = libro;
    Materialize.toast("'" + libro.titulo + "' asignado al nuevo ejemplar", 3000, 'toastSuccess');
  }

  // Métodos para la ventana modal de selección de selección de libro
  openSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['open'] });
  }
  closeSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['close'] });
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

  // Métodos para la ventana modal de confirmación de incidente
  openReportar(incidente: string) {
    this.incidente = incidente;
    this.modalReportar.emit({action:"modal",params:['open']});
  }
  closeReportar() {
    this.modalReportar.emit({action:"modal",params:['close']});
  }

  // Método: reportar
  // Objetivo: Reportar el ejemplar.
  reportar(){
    this.closeReportar();
  }

  //Método: manejarOpciones
  // Objetivo: Habilitar elementos según sea el caso
  manejarOpciones(opcion: string){
    if(opcion == 'mayor'){
      // Crear un nuevo ejemplar y asignarle un nuevo libro.
      this.nuevoEjemplar = new NuevoEjemplar;
      this.nuevoEjemplar.libro = new Libro;
    }
    this.opcion = opcion;
  }

}
