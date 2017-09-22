/*
*Nombre del módulo:
*Dirección física:
*Objetivo:
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { SugerenciasService, Libro } from './../servicios'

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './sugerencia-nueva-docente.component.html',
  styles: [`
      .previa {
        width: 150px;
        height: 206px;
        margin-top:5px;
      }
      `]
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
