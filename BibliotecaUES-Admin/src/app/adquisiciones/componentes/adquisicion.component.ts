/*
*Nombre del módulo: Gestión de adquisiciones
*Dirección física: src\app\adquisiciones\componentes\adquisicion.component.ts
*Objetivo: Mostrar información de una adquisición especifica
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdquisicionesService, Adquisicion }  from './../servicios'

declare var Materialize: any;

@Component({
  templateUrl: './adquisicion.component.html'
})
export class AdquisicionComponent implements OnInit {
  adquisicion: Adquisicion;
  showButton: boolean = false;

  errorMessage: string;
  showMessage: boolean = false;

  constructor(private adquisicionesService: AdquisicionesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Obtiene el id de la adquisición
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.adquisicionesService.obtener(id).subscribe(
      adquisicion =>{
        this.adquisicion = adquisicion;

        this.adquisicion.ejemplares.forEach( (ejemplar) => {
          console.log(ejemplar.ingresado);
          this.showButton = this.showButton || !ejemplar.ingresado;
        });
      },
      error =>{
        //Si la adquisición no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

  guardar(){
    // Mostrar mensajes.
    this.showMessage = true;
    this.errorMessage = null;

    this.adquisicionesService.catalogar(this.adquisicion.ejemplares).subscribe(
      message =>{
        this.showMessage= false;
        Materialize.toast("Datos guardados", 3000);
        this.adquisicion.ejemplares.forEach((ejemplar) => {
          this.showButton = false;
          this.showButton = this.showButton || !ejemplar.ingresado;
        });
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Códigos de barra duplicados";
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

}
