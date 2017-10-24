/*
*Nombre del módulo: ejemplar
*Dirección física: src\app\consultas\componentes\ejemplar.component.ts
*Objetivo: Mostrar información de un ejemplar específico
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EjemplaresService, Ejemplar }  from './../servicios'

@Component({
  templateUrl: './ejemplar.component.html'
})
export class EjemplarComponent implements OnInit {
  ejemplar: Ejemplar;

  constructor(
    private ejemplarService: EjemplaresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtiene el id del ejemplar
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.ejemplarService.obtener(id).subscribe(
      ejemplar =>{
        this.ejemplar = ejemplar;
      },
      error =>{
        //Si el ejemplar no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }
}
