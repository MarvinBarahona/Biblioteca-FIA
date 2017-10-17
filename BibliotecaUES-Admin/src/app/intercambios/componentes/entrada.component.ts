/*
*Nombre del componente: entrada
*Dirección física: src\app\intercambios\componentes\entrada.component.ts
*Objetivo: Mostrar información de la entrada de un intercambio e ingreso de códigos de barra
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { IntercambiosService, EjemplaresService, Intercambio }  from './../servicios';

declare var Materialize: any;

@Component({
  templateUrl: './entrada.component.html',
})
export class EntradaComponent implements OnInit {
  entrada: Intercambio;
  showButton: boolean = false;
  catalogador: boolean

  errorMessage: string;
  showMessage: boolean = false;

  constructor(
    private intercambiosService: IntercambiosService,
    private ejemplaresService: EjemplaresService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    // Obtiene el id del intercambio
    let id = this.route.snapshot.params['id'];

    // Determina si el usuario tiene los permisos de catalogación
    let user = this.cookieService.getObject('usuario');
    let i = user['politicas'].indexOf(122);
    this.catalogador = i > -1;

    // Llama al servicio
    this.intercambiosService.obtener(id).subscribe(
      entrada =>{
        this.entrada = entrada;
        let pendiente = false;

        this.entrada.ejemplares.forEach( (ejemplar) => {
          pendiente = pendiente || !ejemplar.ingresado;
        });

        this.showButton = this.catalogador && pendiente;
      },
      error =>{
        //Si el intercambio no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

  // Método: guardar
  // Objetivo: gurdar los código de barra ingresados.
  guardar(){
    // Mostrar mensajes.
    this.showMessage = true;
    this.errorMessage = null;

    this.ejemplaresService.catalogar(this.entrada.ejemplares).subscribe(
      message =>{
        this.showMessage= false;
        Materialize.toast("Datos guardados", 3000, 'toastSuccess');

        let pendiente = false;
        this.entrada.ejemplares.forEach( (ejemplar) => {
          ejemplar.ingresado = ejemplar.codigo? true: false;
          pendiente = pendiente || !ejemplar.ingresado;
        });

        this.showButton = pendiente;
      },
      error => {
        this.showMessage= false;
        this.errorMessage = "Códigos de barra duplicados";
      }
    );
  }
}
