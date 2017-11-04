/*
*Nombre del módulo: ejemplar
*Dirección física: src\app\consultas\componentes\ejemplar.component.ts
*Objetivo: Mostrar información de un ejemplar específico
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { EjemplaresService, Ejemplar }  from './../servicios'

@Component({
  templateUrl: './ejemplar.component.html',
  styles: [`
    .modal{
      height: 250px;
      width: 350px;
    }
  `]
})
export class EjemplarComponent implements OnInit {
  ejemplar: Ejemplar;

  modalRetirar = new EventEmitter<string|MaterializeAction>();

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

  // Métodos para la ventana modal de confirmación de retiro
  openRetirar() {
    this.modalRetirar.emit({action:"modal",params:['open']});
  }
  closeRetirar() {
    this.modalRetirar.emit({action:"modal",params:['close']});
  }

  // Método: retirar
  // Objetivo: Retirar el ejemplar.
  retirar(){
    this.closeRetirar();
  }
}
