/*
*Nombre del componente: restaurar-contra
*Dirección: /src/app/login/componentes/restaurar-contra.component.ts
*Objetivo: permite al usuario restaurar su contraseña.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../servicios/';

@Component({
  templateUrl: './restaurar-contra.component.html'
})

export class RestaurarContraComponent implements OnInit {
  correo: string;

  message: string;
  errorMessage: string;
  successMessage: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
      this.correo = this.route.snapshot.queryParams['email'];
  }

  // Método: restaurar
  // Objetivo: solicitar un cambio de contraseña
  restaurar(){
    // Mostrar mensaje de espera
    this.message = "Solicitando el cambio de contraseña...";
    this.errorMessage = null;
    this.successMessage = null;

    // Llamar al servicio.
    this.authService.restaurarContra(this.correo).subscribe(
      message => {
        this.message = null;
        this.successMessage = "Se le ha enviado un correo, por favor reviselo";
      },
      error => {
        this.message = null;
        if(error.status == 404) this.errorMessage = "No hay usuario con ese correo";
        this.errorMessage = "Error al solicitar el cambio";
      }
    );
  }

}
