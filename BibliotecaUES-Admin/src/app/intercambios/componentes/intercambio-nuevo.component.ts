/*
*Nombre del componente: intercambio-nuevo
*Dirección física: src\app\intercambios\componentes\intercambio-nuevo.component.ts
*Objetivo: Permite la ingresar un nuevo intercambio
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { IntercambiosService, EjemplaresService, Intercambio, Ejemplar } from './../servicios/'

declare var Materialize: any;
declare var $:any;

@Component({
  templateUrl: './intercambio-nuevo.component.html',
  styles: [`
    .search{
      margin-top: 20px;
      left:-20px;
    }
  `]
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private intercambiosService: IntercambiosService,
    private ejemplaresService: EjemplaresService
  ) { }

  ngOnInit() {
    // Inicializar el objeto.
    this.intercambio = new Intercambio;
    this.intercambio.ejemplares = new Array<Ejemplar>();

    // Inicializar el input con autocompletado
    this.codigos = new Array<string>();
    this.inicializarAutocompletado();

    // Array de facultades
    this.facultades = [
      "Central",
      "Agronomía",
      "Ciencias naturales y matemáticas",
      "Derecho",
      "Economía",
      "Humanidades",
      "Medicina",
      "Odontologia",
      "Química y farmacia"
    ];
  }

  // Método: eliminarEjemplar
  // Objetivo: eliminar un ejemplar de la tabla de ejemplares a intercambiar
  eliminarEjemplar(ejemplar: Ejemplar){
    let i = this.intercambio.ejemplares.indexOf(ejemplar);
    if(i > -1) this.intercambio.ejemplares.splice(i, 1);
  }

  // Método: inicializarAutocompletado
  // Objetivo: hace el input de búsqueda con autocompletado
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
    let ingresado = false;

    this.intercambio.ejemplares.forEach((ejemplar)=>{
      if(ejemplar.codigo == this.codigo) ingresado = true;
    });

    if(!ingresado){
      this.ejemplaresService.obtenerInactivosPorCodigo(this.codigo).subscribe(
        ejemplar => {
          this.showMessage = false;
          this.intercambio.ejemplares.push(ejemplar);
          this.codigo = "";
        },
        error => {
          this.showMessage = false;
          if(error.status == 404) this.message = "El ejemplar " + this.codigo + " no existe.";
          else this.message = "El ejemplar " + this.codigo + " no está inactivo.";
        }
      )
    }
    else{
      this.showMessage = false;
    }
  }

  // Método: crear
  // Objetivo: crear un nuevo intercambio
  crear(){
    // Mostrar mensaje de espera.
    this.showMessage2 = true;
    this.errorMessage = null;

    this.intercambiosService.crear(this.intercambio).subscribe(
      message => {
        Materialize.toast("Intercambio creado", 3000, 'toastSuccess');
        this.router.navigate(['/intercambios']);
      },
      error => {
        this.showMessage2 = false;
        this.errorMessage = "Error al crear intercambio";
      }
    );
  }

  // Métodos para la ventana modal de cancelación.
  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }

  // Método: cancel
  // Objetivo: cerrar la ventana modal y regresar a la vista anterior
  cancel(){
    this.closeCancel();
    this.router.navigate(['/intercambios']);
  }

}
