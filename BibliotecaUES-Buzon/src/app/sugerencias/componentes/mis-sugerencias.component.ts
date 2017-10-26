/*
*Nombre del componente: mis-sugerencias
*Dirección física: src/app/sugerencias/componentes/mis-sugerencias.component.ts
*Objetivo: Comprobar el estado de las sugerencias realizadas.
**/

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SugerenciasService, MiSugerencia } from './../servicios';

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './mis-sugerencias.component.html'
})

export class MisSugerenciasComponent implements OnInit {
  sugerencias: MiSugerencia[];
  docente: boolean;
  idUsuario: number;

  constructor(
    private sugerenciasService: SugerenciasService,
    private router: Router
  ) { }

  ngOnInit() {
    // Llama al servicios
    this.idUsuario = JSON.parse(sessionStorage.getItem("usuario")).id;
    this.docente = JSON.parse(sessionStorage.getItem("usuario")).grupo==="Docente";

    this.sugerenciasService.misSugerencia(this.idUsuario, this.docente).subscribe(
      sugerencias => {
        this.sugerencias = sugerencias;
      }
    );
  }


}
