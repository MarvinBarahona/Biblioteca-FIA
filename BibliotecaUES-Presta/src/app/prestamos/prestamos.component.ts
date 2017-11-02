/*
*Nombre del componente: prestamos
*Dirección física: src/app/prestamos/componentes/prestamos.component.ts
*Objetivo: Buscar un ejemplar prestado y devolverlo o renovarlo.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { DatepickerOptions } from 'ng2-datepicker';

import { EjemplaresService, PrestamosService, Transaccion, Ejemplar }  from './servicios';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './prestamos.component.html',
  styles: [`
    .search{
      margin-top: 20px;
      left:-20px;
    }

    #modalD{
      height: 250px;
      width: 500px;
    }

    #modalR{
      height: 360px;
      width: 500px;
    }
  `]
})

export class PrestamosComponent implements OnInit {
  ejemplares: Ejemplar[];
  transaccion: Transaccion;
  fechaDevolucion: Date;
  hoy: Date;

  codigos = Array<string>();
  codigo: string;
  message: string = "No se encontraron resultados"

  modalRenovar = new EventEmitter<string | MaterializeAction>();
  modalDevolver = new EventEmitter<string | MaterializeAction>();

  dpOptions: DatepickerOptions = {};

  constructor(
    private router: Router,
    private prestamosService: PrestamosService,
    private ejemplaresService: EjemplaresService
  ) {
    this.dpOptions = {
      minYear: 2017,
      maxYear: 2025,
      displayFormat: 'DD/MM/YYYY',
      barTitleFormat: 'MMMM YYYY'
    }
  }

  ngOnInit() {
    // Activar el nav en responsive.
    $("#toogle_menu").sideNav({ closeOnClick: true });

    // Iniciar el autocompletado en el input de búsqueda.
    this.inicializarAutocompletado();

    // Inicializar la fecha de devolución
    this.fechaDevolucion = new Date;
  }

  //Método: renovar
  //Objetivo: Confirmar le renovación de un préstamo
  renovar(){
    this.hoy = this.transaccion.fechaDevolucion;
    if(this.fechaDevolucion == null){
      Materialize.toast("Ingrese la fecha de devolución", 3000, "toastError");
    }
    else{
      if(this.fechaDevolucion <= this.hoy){
        Materialize.toast("La fecha de devolución debe ser mayor a la anterior", 3000, "toastError");
      }
      else{
        this.transaccion.fechaDevolucion = this.fechaDevolucion;
        this.prestamosService.renovacion(this.transaccion).subscribe(
          msg => {
            this.closeRenovar();
            this.transaccion = null;
            Materialize.toast("Préstamo renovado", 3000, "toastSuccess");
            this.fechaDevolucion = new Date;
          },
          error => {
            Materialize.toast("Error al registrar la renovación", 3000, "toastError");
          }
        );
      }
    }
  }

  //Método: devolver
  //Objetivo: Confimar la devolución de un ejemplar
  devolver(){
    this.prestamosService.devolucion(this.transaccion).subscribe(
      msg => {
        this.closeDevolver();
        this.transaccion = null;
        Materialize.toast("Ejemplar devuelto", 3000, "toastSuccess");
      },
      error => {
        Materialize.toast("Error al devolver el ejemplar", 3000, "toastError");
      }
    );
  }

  //Método: buscar
  //Objetivo: Buscar un libro por medio del código de barra
  buscar(){
    this.transaccion = null;
    this.message = "Buscando...";

    this.ejemplaresService.obtenerTransaccionPorCodigo(this.codigo).subscribe(
      transaccion => {
        if(transaccion.esPrestamo){
          this.message = null;
          this.transaccion = transaccion;
        }
        else{
          this.message = "El ejemplar buscado no está prestado";
        }
      },
      error => {
        this.message = "No se encontraron resultado para " + this.codigo;
      }
    )
  }

  //Método: inicializarAutocompletado
  //Objetivo: Inicializar input con opciones de autocompletar
  inicializarAutocompletado(){
    this.ejemplaresService.obtenerTodos().subscribe(
      ejemplares => {
        this.ejemplares = ejemplares;

        var i=0;
        for(var i:number; i<this.ejemplares.length; i++){
          if(ejemplares[i].codigo != null){
            this.codigos.push(ejemplares[i].codigo);
          }
        }

        // Transforma los códigos en un objeto para el autocompletado
        let codigosData = {};
        this.codigos.forEach((codigo)=>{
          codigosData[codigo] = null;
        });

        // Inicializar el campo con autocompletado
        $('#codigo').autocomplete({
          data: codigosData,
          limit: 5,
          minLength: 2,
          onAutocomplete: (val) => {
            this.codigo = val;
          }
        });
      }
    );
  }

  // Métodos para el manejo de la ventana modal de renovación.
  openRenovar() {
    this.modalRenovar.emit({ action: "modal", params: ['open'] });
  }
  closeRenovar() {
    this.modalRenovar.emit({ action: "modal", params: ['close'] });
  }

  // Métodos para el manejo de la ventana modal de devolución
  openDevolver() {
    this.modalDevolver.emit({ action: "modal", params: ['open'] });
  }
  closeDevolver() {
    this.modalDevolver.emit({ action: "modal", params: ['close'] });
  }

}
