/*
*Nombre del módulo: Intercambio
*Dirección física: src\app\intercambios\componentes\intercambio.component.ts
*Objetivo: Permite consultar los datos de un intercambio e ingresar el código de barras de los ejemplares de entrada.
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { Intercambio }  from './../servicios';

declare var Materialize: any;

@Component({
  templateUrl: './intercambio.component.html'
})
export class IntercambioComponent implements OnInit {
  intercambio: Intercambio
  showButton: boolean = false;
  catalogador: boolean

  errorMessage: string;
  showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}


  ngOnInit() {
    // Obtiene el id de la adquisición
    let id = this.route.snapshot.params['id'];

    // Determina si el usuario tiene los permisos de catalogación
    let user = this.cookieService.getObject('usuario');
    let i = user['politicas'].indexOf(122);
    this.catalogador = i > -1;

    // Llama al servicio
    /*this.adquisicionesService.obtener(id).subscribe(
      adquisicion =>{
        this.adquisicion = adquisicion;
        let pendiente = false;

        this.adquisicion.ejemplares.forEach( (ejemplar) => {
          pendiente = pendiente || !ejemplar.ingresado;
        });

        this.showButton = this.catalogador && pendiente;
      },
      error =>{
        //Si la adquisición no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );*/
  }

  guardar(){
    // Mostrar mensajes.
    this.showMessage = true;
    this.errorMessage = null;

    /*this.adquisicionesService.catalogar(this.adquisicion.ejemplares).subscribe(
      message =>{
        this.showMessage= false;
        Materialize.toast("Datos guardados", 3000);

        let pendiente = false;
        this.adquisicion.ejemplares.forEach( (ejemplar) => {
          pendiente = pendiente || !ejemplar.ingresado;
        });

        this.showButton = pendiente;
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Códigos de barra duplicados";
      }
    );*/
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
