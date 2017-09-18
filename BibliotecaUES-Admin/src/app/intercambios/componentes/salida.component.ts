/*
*Nombre del módulo: Salida
*Dirección física: src\app\intercambios\componentes\salida.component.ts
*Objetivo: Permite consultar los datos de la salida de un intercambio
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IntercambiosService, Intercambio }  from './../servicios';

declare var Materialize: any;

@Component({
  templateUrl: './salida.component.html'
})
export class SalidaComponent implements OnInit {
  salida: Intercambio;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private intercambiosService: IntercambiosService
  ) {}


  ngOnInit() {
    // Obtiene el id de la adquisición
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.intercambiosService.obtener(id).subscribe(
      salida =>{
        this.salida = salida;
      },
      error =>{
        //Si el intercambio no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

  // Redirigir a la vista de un libro
  linkLibro(id: number){
    this.router.navigate(['/libros/'+id]);
  }

  // Redirigir a la vista del ejemplar
  linkEjemplar(id: number){
    this.router.navigate(['/ejemplares/'+id]);
  }

  // Redirige a la vista de la entrada del intercambio
  entrada(){
    this.router.navigate(["/intercambios/entrada/" + this.salida.relacionado]);
  }

  // Redirige a la vista de registro de la entrada del intercambio
  pendiente(){
    this.router.navigate(["/intercambios/pendiente", {id: this.salida.id, facultad: this.salida.facultad}]);
  }

}
