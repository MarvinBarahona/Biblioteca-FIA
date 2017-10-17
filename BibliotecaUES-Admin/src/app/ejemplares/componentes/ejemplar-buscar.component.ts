/*
*Nombre del componente: ejemplar-buscar
*Dirección física: src\app\ejemplares\componentes\ejemplar-buscar.component.ts
*Objetivo: Buscar ejemplares por medio del código de barra
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EjemplaresService, Ejemplar } from './../servicios';

declare var $:any;

@Component({
  templateUrl: './ejemplar-buscar.component.html',
  styles: [`
    .search{
      margin-top: 20px;
      left:-20px;
    }
  `]
})
export class EjemplarBuscarComponent implements OnInit {
  ejemplares: Ejemplar[];
  codigos: string[];
  ejemplar: Ejemplar;
  codigo: string;
  message: string = "No se encontraron resultados"

  constructor(
    private ejemplaresService: EjemplaresService,
    private router: Router
  ) { }

  ngOnInit() {
    // Iniciarlizar el autocompletado del campo del buscador.
    this.inicializarAutocompletado();
  }

  // Método: inicializarAutocompletado
  // Objetivo: Inicializar el autocompletado del campo del buscador.
  inicializarAutocompletado(){
    this.codigos = new Array<string>();

    // Consumir el servicio de obteción de todos los ejemplares registrados.
    this.ejemplaresService.obtenerTodos().subscribe(
      ejemplares => {
        this.ejemplares = ejemplares;

        // Hacer un arreglo para la asignación de data del autocompletado
        this.ejemplares.forEach((ejemplar)=>{
          if(ejemplar.codigo != null){
            this.codigos.push(ejemplar.codigo);
          }
        });

        // Transforma los códigos en un objeto para el autocompletado
        let codigosData = {};
        this.codigos.forEach((codigo)=>{
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

  // Método: buscar
  // Objetivo: Permite realizar la búsqueda de un ejemplar por su código de barra.
  buscar(){
    this.ejemplar = null;
    this.message = "Buscando...";

    // Consumir el servicio de búsqueda.
    this.ejemplaresService.obtenerPorCodigo(this.codigo).subscribe(
      ejemplar => {
        this.ejemplar = ejemplar;
      },
      error => {
        this.message = "No se encontraron resultado para " + this.codigo;
      }
    )
  }
}
