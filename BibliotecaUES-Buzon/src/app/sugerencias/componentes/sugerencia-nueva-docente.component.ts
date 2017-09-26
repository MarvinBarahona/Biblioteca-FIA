/*
*Nombre del módulo: Gestión de sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencia-nueva-docente.component.ts
*Objetivo: Crear sugerencia de un docente
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { SugerenciasService } from './../servicios'

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './sugerencia-nueva-docente.component.html'
})
export class SugerenciaNuevaDocenteComponent implements OnInit {


constructor(private sugerenciasService: SugerenciasService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.inicializarAutocompletado();
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
