/*
*Nombre del componente: descarte
*Dirección física: src/app/descartes/componentes/descarte.component.ts
*Objetivo: Mostrar el detalle de ejemplares descartados conjuntamente.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// import {  } from './../servicios';


@Component({
  templateUrl: './descarte.component.html'
})

export class DescarteComponent implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

}
