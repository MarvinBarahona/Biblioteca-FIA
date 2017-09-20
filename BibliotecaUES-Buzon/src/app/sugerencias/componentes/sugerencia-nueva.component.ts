/*
*Nombre del módulo:
*Dirección física:
*Objetivo:
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SugerenciasService, Libro } from './../servicios'

@Component({
  templateUrl: './sugerencia-nueva.component.html',
  styles: [`
      .previa {
        width: 150px;
        height: 206px;
        margin-top:5px;
      }
      `]
})
export class SugerenciaNuevaComponent implements OnInit {


constructor(private sugerenciasService: SugerenciasService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
  }

}
