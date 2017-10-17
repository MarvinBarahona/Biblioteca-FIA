/*
*Nombre del componente: cambiar-contra
*Dirección: /src/app/login/componentes/cambiar-contra.component.ts
*Objetivo: permite al usuario cambiar su contraseña.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../servicios'

declare var Materialize: any;

@Component({
  templateUrl: './cambiar-contra.component.html'
})
export class CambiarContraComponent implements OnInit {
  contra: string;
  contra2: string;
  id: number;
  token: string;
  confirmar: boolean;

  errorMessage: string;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.confirmar = false;

    // Obtiene el id y el token para cambiar la contraseña.
    this.id = this.route.snapshot.params['id'];
    this.token = this.route.snapshot.params['token'];
  }

  // Método: validar
  // Objetivo: habilitar el botón solo cuando se ingresa dos contraseñas válidas.
  validar(){
    this.confirmar = this.contra && (this.contra === this.contra2);
    if(this.confirmar){
      this.errorMessage = null;
    }
    else{
      this.errorMessage = "Las contraseñas no coinciden";
    }
  }

  // Método: cambiar
  // Objetivo: Cambiar la contraseña.
  cambiar(){
    // Mostrar mensaje de espera
    this.message = "Cambiando contraseña...";
    this.errorMessage = null;

    // Llamar al servicio.
    this.authService.cambiarContra(this.contra, this.id, this.token).subscribe(
      message => {
        this.message = null;
        Materialize.toast("Contraseña cambiada con éxito", 3000, 'toastSuccess');
        this.router.navigate(['/login']);
      },
      error => {
        this.message = null;
        this.errorMessage = "Error al cambiar contraseña";
      }
    );
  }

}
