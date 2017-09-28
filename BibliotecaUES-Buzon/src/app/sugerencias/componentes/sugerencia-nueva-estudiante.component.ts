/*
*Nombre del módulo: Gestión de sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencia-nueva-estudiante.component.ts
*Objetivo: Crear sugerencia de un estudiante
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { SugerenciasService } from './../servicios'

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './sugerencia-nueva-estudiante.component.html'
})
export class SugerenciaNuevaEstudianteComponent implements OnInit {


constructor(private sugerenciasService: SugerenciasService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.inicializarAutocompletado();

    this.sugerenciasService.obtenerCarreras().subscribe(
      carreras => {
        console.log(carreras);
      }
    );
  }

  crear(){}

  // Inicializar el campo con autocompletado.
  inicializarAutocompletado(){
    $('#materias').material_chip({
      autocompleteOptions: {
        data: {
        },
        limit: 5,
        minLength: 1
      }
    });
  }

}
