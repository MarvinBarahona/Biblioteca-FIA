/*
*Nombre del componente: not-found
*Dirección: /src/app/login/componentes/not-found.component.ts
*Objetivo: Mostrar mensaje en las rutas que no tengan componente asignado
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styles: [`
    #error404{
      width: 100%;
    }

    .card-panel{
      margin-top: 30px;
    }
  `]
})
export class NotFoundComponent implements OnInit {
  constructor() { }
  ngOnInit() {}
}
