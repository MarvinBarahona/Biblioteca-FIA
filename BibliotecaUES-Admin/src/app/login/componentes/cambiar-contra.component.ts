/*
*Nombre del módulo: cambiar contraseña
*Dirección: /src/app/login/componentes/cambiar-contra.component.ts
*Objetivo: permite al usuario cambiar su contraseña. 
*/

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './cambiar-contra.component.html'
})
export class CambiarContraComponent implements OnInit {
  contra: string;
  contra2: string;
  confirmar: boolean;

  errorMessage: string;
  message: string;

  constructor() { }

  ngOnInit() {
    this.confirmar = false;
  }

  validar(){
    this.confirmar = this.contra && (this.contra === this.contra2);
    if(this.confirmar){
      this.errorMessage = null;
    }
    else{
      this.errorMessage = "Las contraseñas no coinciden";
    }
  }

}
