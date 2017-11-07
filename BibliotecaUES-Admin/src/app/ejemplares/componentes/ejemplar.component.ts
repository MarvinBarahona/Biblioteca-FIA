/*
*Nombre del componente: ejemplar
*Dirección física: src\app\ejemplares\componentes\ejemplar.component.ts
*Objetivo: Mostrar información de un ejemplar específico
**/

import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie';

import { EjemplaresService, TransaccionesService, Ejemplar, Transaccion, NuevoEjemplar, Libro } from './../servicios'

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
      width: 500px;
    }
  `]
})
export class EjemplarComponent implements OnInit {
  ejemplar: Ejemplar;
  incidente: string;
  opcion: string;
  permisoAgregar: boolean;

  nuevoEjemplar: NuevoEjemplar;
  motivo: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  modalSeleccion = new EventEmitter<string | MaterializeAction>();
  modalRetirar = new EventEmitter<string|MaterializeAction>();
  modalReportar = new EventEmitter<string|MaterializeAction>();

  @ViewChild(DataTableDirective)dtElement: DataTableDirective;

  constructor(
    private ejemplarService: EjemplaresService,
    private transaccionesService: TransaccionesService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
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

    // Determinar si el usuario posee permisos para resolver daños / extravíos
    let usuario = this.cookieService.getObject('usuario');
    let i = usuario['politicas'].indexOf(113);
    this.permisoAgregar = i != -1;
  }

  ngOnInit() {
    // Obtiene el id del ejemplar
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.ejemplarService.obtener(id).subscribe(
      ejemplar => {
        this.ejemplar = ejemplar;
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
    this.transaccionesService.retirar(this.ejemplar, this.motivo).subscribe(
      (message)=>{
        // Agregar la nueva transacción a los pedidos.
        let nuevaTransaccion = new Transaccion;
        nuevaTransaccion.fecha = new Date;
        nuevaTransaccion.usuario = this.obtenerUsuario();
        nuevaTransaccion.tipo = "Retiro";
        nuevaTransaccion.nombre = this.motivo;
        this.ejemplar.transacciones.push(nuevaTransaccion);

        // Recargar la tabla de transacciones
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{dtInstance.destroy(); this.dtTrigger.next();});

        // Cambiar el estado del ejemplar
        this.ejemplar.estado = "Retirado";

        Materialize.toast("Ejemplar retirado", 3000, "toastSuccess");
        // Cerrar el modal
        this.closeRetirar();
      },
      (error)=>{
        Materialize.toast("Error al retirar el ejemplar", 3000, "toastError");
      }
    );
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
    this.transaccionesService.registrarPercance(this.ejemplar, this.ultimaTransaccion(), this.incidente).subscribe(
      (message)=>{

        // Agregar la nueva transacción a los pedidos.
        let nuevaTransaccion = new Transaccion;
        nuevaTransaccion.fecha = new Date;
        nuevaTransaccion.usuario = this.obtenerUsuario();
        nuevaTransaccion.tipo = this.incidente;
        nuevaTransaccion.detalles = {};
        nuevaTransaccion.detalles["userId"] = this.ultimaTransaccion().detalles.userId;
        this.ejemplar.transacciones.push(nuevaTransaccion);

        // Recargar la tabla de transacciones
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{dtInstance.destroy(); this.dtTrigger.next();});

        // Cambiar el estado del ejemplar
        this.ejemplar.estado = "Inhabilitado";

        Materialize.toast("Percance reportado", 3000, "toastSuccess");
        // Cerrar el modal
        this.closeReportar();
      },
      (error)=>{
        Materialize.toast("Error al reportar el percance", 3000, "toastError");
      }
    );
  }

  // Método: exonerar
  // Objetivo: registrar la exoneración de un ejemplar
  exonerar(){
    this.transaccionesService.exonerar(this.ejemplar, this.ultimaTransaccion()).subscribe(
      (message)=>{

        // Agregar la nueva transacción a los pedidos.
        let nuevaTransaccion = new Transaccion;
        nuevaTransaccion.fecha = new Date;
        nuevaTransaccion.usuario = this.obtenerUsuario();
        nuevaTransaccion.tipo = "Exoneración";
        nuevaTransaccion.detalles = {};
        nuevaTransaccion.detalles["userId"] = this.ultimaTransaccion().detalles.userId;
        this.ejemplar.transacciones.push(nuevaTransaccion);

        // Recargar la tabla de transacciones
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{dtInstance.destroy(); this.dtTrigger.next();});

        // Cambiar el estado del ejemplar
        this.ejemplar.estado = "Retirado";

        Materialize.toast("Exoneración registrada", 3000, "toastSuccess");
        // Cerrar el modal
        this.closeReportar();
      },
      (error)=>{
        Materialize.toast("Error al registrar la exoneración", 3000, "toastError");
      }
    );
  }

  // Método: restaurar
  // Objetivo: registrar la restauración de un ejemplar
  restaurar(){
    this.transaccionesService.restaurar(this.ejemplar, this.ultimaTransaccion()).subscribe(
      (message)=>{

        // Agregar la nueva transacción a los pedidos.
        let nuevaTransaccion = new Transaccion;
        nuevaTransaccion.fecha = new Date;
        nuevaTransaccion.usuario = this.obtenerUsuario();
        nuevaTransaccion.tipo = "Restauración";
        nuevaTransaccion.detalles = {};
        nuevaTransaccion.detalles["userId"] = this.ultimaTransaccion().detalles.userId;
        this.ejemplar.transacciones.push(nuevaTransaccion);

        // Recargar la tabla de transacciones
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{dtInstance.destroy(); this.dtTrigger.next();});

        // Cambiar el estado del ejemplar
        this.ejemplar.estado = "Inactivo";

        Materialize.toast("Restauración registrada", 3000, "toastSuccess");
        // Cerrar el modal
        this.closeReportar();
      },
      (error)=>{
        Materialize.toast("Error al registrar la restauración", 3000, "toastError");
      }
    );
  }

  // Método: sustituir
  // Objetivo: registrar la sustitución de un ejemplar
  sustituir(){
    this.transaccionesService.sustituir(this.ejemplar, this.ultimaTransaccion(), this.nuevoEjemplar).subscribe(
      (message)=>{

        // Agregar la nueva transacción a los pedidos.
        let nuevaTransaccion = new Transaccion;
        nuevaTransaccion.fecha = new Date;
        nuevaTransaccion.usuario = this.obtenerUsuario();
        nuevaTransaccion.tipo = "Sustitución";
        nuevaTransaccion.detalles = {};
        nuevaTransaccion.detalles["userId"] = this.ultimaTransaccion().detalles.userId;
        nuevaTransaccion.nombre = "Sustituido por ejemplar " + this.nuevoEjemplar.codigo,
        this.ejemplar.transacciones.push(nuevaTransaccion);

        // Recargar la tabla de transacciones
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{dtInstance.destroy(); this.dtTrigger.next();});

        // Cambiar el estado del ejemplar
        this.ejemplar.estado = "Retirado";

        Materialize.toast("Sustitución registrada", 3000, "toastSuccess");
        // Cerrar el modal
        this.closeReportar();
      },
      (error)=>{
        Materialize.toast("Error al registrar la sustitución", 3000, "toastError");
      }
    );
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

  // Método: ultimaTransaccion
  // Objetivo: Obtener la ultima transacción del ejemplar
  ultimaTransaccion() : Transaccion{
    return this.ejemplar.transacciones[this.ejemplar.transacciones.length - 1];
  }

  // Método: obtenerUsuario
  // Objetivo: Obtiene el nombre del usuario actual
  obtenerUsuario(): string{
    let u = this.cookieService.getObject('usuario');
    return u['nombre'];
  }

}
