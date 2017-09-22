/*
*Nombre del módulo:
*Dirección física:
*Objetivo:
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
