/*
*Nombre del componente: ejemplar
*Dirección física: src\app\ejemplares\componentes\ejemplar.component.ts
*Objetivo: Mostrar información de un ejemplar específico
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EjemplaresService, Ejemplar, Transaccion }  from './../servicios'

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

  // Método: linkProceso
  // Objetivo: Redirigir a la vista del proceso correspondiente.
  linkProceso(transaccion: Transaccion){
    switch(transaccion.tipo){
      case "Donación":{
        this.router.navigate(['/adquisiciones/' + transaccion.id]);
        break;
      }
      case "Compra":{
        this.router.navigate(['/adquisiciones/' + transaccion.id]);
        break;
      }
      case "Entrada":{
        this.router.navigate(['/intercambios/entrada/' + transaccion.id]);
        break;
      }
      case "Salida":{
        this.router.navigate(['/intercambios/salida/' + transaccion.id]);
        break;
      }
      default:{
        break;
      }
    }

  }
}
