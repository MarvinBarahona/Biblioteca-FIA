/*
*Nombre del módulo: Gestión de sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencia.component.ts
*Objetivo: Ver el detalle de una sugerencia
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SugerenciasService, Sugerencia } from './../servicios'

@Component({
  templateUrl: './sugerencia.component.html'
})
export class SugerenciaComponent implements OnInit {
  sugerencia: Sugerencia;

  constructor(private sugerenciasService: SugerenciasService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.params['id'];

    this.sugerenciasService.obtener(id).subscribe(
      sugerencia => {
        this.sugerencia = sugerencia;
      }
    );
  }

}
