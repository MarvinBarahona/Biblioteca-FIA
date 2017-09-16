/*
*Nombre del módulo: Interacmbio
*Dirección física: src\app\intercambios\componentes\intercambio-nuevo.component.ts
*Objetivo: Permite la ingresar un nuevo intercambio
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { IntercambiosService, Intercambio, Ejemplar } from './../servicios/'

declare var Materialize: any;
declare var $:any;

@Component({
  templateUrl: './intercambio-nuevo.component.html'
})
export class IntercambioNuevoComponent implements OnInit {
  intercambio: Intercambio;
  ejemplares: Ejemplar[];
  facultades: string[];
  codigos: string[];
  codigo: string;

  modalCancel = new EventEmitter<string | MaterializeAction>();

  errorMessage: string;
  showMessage: boolean = false;
  showMessage2: boolean = false;
  message: string;

  constructor(private router: Router, private route: ActivatedRoute, private intercambiosService: IntercambiosService) { }

  ngOnInit() {
    // Inicializar el objeto.
    this.intercambio = new Intercambio;
    this.intercambio.salidas = new Array<Ejemplar>();

    // Inicializar el input con autocompletado
    this.codigos = new Array<string>();
    this.inicializarAutocompletado();

    // Array de facultades
    this.facultades = [
      "Medicina",
      "Economía",
      "Humanidades",
      "Jurisprudencia"
    ];
  }

  // Método: eliminarEjemplar
  // Objetivo: eliminar un ejemplar de la tabla de ejemplares a intercambiar
  eliminarEjemplar(ejemplar: Ejemplar){
    let i = this.intercambio.salidas.indexOf(ejemplar);
    if(i > -1) this.intercambio.salidas.splice(i, 1);
  }

  // Método: inicializarAutocompletado
  // Objetivo: hace el input de búsqueda con autocompletado
  inicializarAutocompletado(){
    this.intercambiosService.obtenerTodos().subscribe(
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
        this.codigos.forEach(function(codigo){
          codigosData[codigo] = null;
        });

        // Inicializar el campo con autocompletado
        $('#codigo').autocomplete({
          data: codigosData,
          limit: 5,
          minLength: 3,
          onAutocomplete: (val) =>{
            this.codigo = val;
          }
        });
      }
    );
  }

  // Método: agregar
  // Objetivo: agregar un ejemplar al intercambio
  agregar(){
    this.message = null;
    this.showMessage = true;

    this.intercambiosService.obtenerPorCodigo(this.codigo).subscribe(
      ejemplar => {
        this.intercambio.salidas.push(ejemplar);
      },
      error => {
        this.showMessage = false;
        if(error.status == 404) this.message = "El ejemplar " + this.codigo + " no existe.";
        else this.message = "El ejemplar " + this.codigo + " no está inactivo.";
      }
    )
  }

  // Para la ventana modal de cancelación.
  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }

  cancel(){
    this.closeCancel();
    this.router.navigate(['/intercambios']);
  }

}
