/*
*Nombre del módulo: Gestión de sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencia.component.ts
*Objetivo: Ver el detalle de una sugerencia
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SugerenciasService } from './../servicios'

@Component({
  templateUrl: './sugerencia.component.html'
})
export class SugerenciaComponent implements OnInit {


constructor(private sugerenciasService: SugerenciasService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
  }

}
