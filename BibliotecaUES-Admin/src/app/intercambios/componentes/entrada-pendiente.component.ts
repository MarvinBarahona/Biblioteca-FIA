/*
*Nombre del módulo: Entrada pendiente
*Dirección física: src\app\intercambios\componentes\entrada-pendiente.component.ts
*Objetivo: Permite la ingresa la entrada de un intercambio
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { IntercambiosService, NuevaEntrada, NuevoEjemplar, Libro } from './../servicios';

declare var Materialize: any;

@Component({
  templateUrl: './entrada-pendiente.component.html'
})
export class EntradaPendienteComponent implements OnInit {
  entrada: NuevaEntrada;

  modalSeleccion = new EventEmitter<string | MaterializeAction>();
  modalCancel = new EventEmitter<string | MaterializeAction>();

  errorMessage: string;
  showMessage: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private intercambiosService: IntercambiosService) { }

  ngOnInit() {
    this.entrada = new NuevaEntrada;
    this.entrada.id = this.route.snapshot.params['id'];
    this.entrada.facultad = this.route.snapshot.params['facultad'];
    this.entrada.ejemplares = new Array<NuevoEjemplar>();
  }

  // Escuchar al evento emitido por el componente libro-seleccion
  onNotify(libro: Libro){
    let nuevo: boolean = true;

    this.entrada.ejemplares.forEach( function(e){
      if(e.libro.isbn === libro.isbn) nuevo = false;
    });

    if(nuevo){
      let ejemplar = new NuevoEjemplar;
      ejemplar.libro = libro;
      ejemplar.cantidad = 1;
      this.entrada.ejemplares.push(ejemplar);

      Materialize.toast("'" + libro.titulo + "' agregado a la adquisición", 3000);
    }
  }

  // Método: eliminarEjemplar
  // Objetivo: eliminar un ejemplar de la tabla de ejemplares a crear.
  eliminarEjemplar(ejemplar: NuevoEjemplar){
    let i = this.entrada.ejemplares.indexOf(ejemplar);
    if(i > -1) this.entrada.ejemplares.splice(i, 1);
  }

  // Método: crear
  // Objetivo: crear una nueva adquisición, por donación o compra.
  crear(){
    // Mostrar mensajes.
    this.showMessage = true;
    this.errorMessage = null;

    // Llamar al servicio
    this.intercambiosService.crearEntrada(this.entrada).subscribe(
      message => {
        this.showMessage= false;
        Materialize.toast("Entrada agregada", 3000);
        this.router.navigate(['/intercambios/salida/' + this.entrada.id]);
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Error al crear la entrada";
      }
    );
  }

  // Método para las ventanas modales.
  openSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['open'] });
  }
  closeSeleccion() {
    this.modalSeleccion.emit({ action: "modal", params: ['close'] });
  }

  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }

  cancel(){
    this.closeCancel();
    this.router.navigate(['/adquisiciones']);
  }
}
