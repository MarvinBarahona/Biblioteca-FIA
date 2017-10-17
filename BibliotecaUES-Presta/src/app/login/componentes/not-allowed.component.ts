/*
*Nombre del componente: not-allowed
*Dirección: /src/app/login/componentes/not-allowed.component.ts
*Objetivo: Mostrar mensaje de acceso denegado cuando sea necesario
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-allowed',
  templateUrl: './not-allowed.component.html',
  styles: [`
    #error403{
      width: 100%;
    }

    .card-panel{
      margin-top: 30px;
    }
  `]
})
export class NotAllowedComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
