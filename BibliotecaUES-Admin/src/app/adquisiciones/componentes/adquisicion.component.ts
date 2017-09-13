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
      },
      error =>{
        //Si la adquisición no existe
        if(error.status == 404){
          this.router.navigate(['/error404']);
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
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Error al guardar los códigos";
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
