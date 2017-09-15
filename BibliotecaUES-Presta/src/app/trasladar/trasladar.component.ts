/*
*Nombre del módulo:
*Dirección física:
*Objetivo: Cambiar el estado de un ejemplar cuando este pasa del área de jefatura a la biblioteca.
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EjemplaresService} from './ejemplares.service';

@Component({
  templateUrl: './trasladar.component.html'
})
export class TrasladarComponent implements OnInit {

  // constructor() {}

  ngOnInit() {
  }

}
