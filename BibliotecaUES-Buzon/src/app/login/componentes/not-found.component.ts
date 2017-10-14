/*
*Nombre del componente: not-found
*Dirección física: src/app/login/componentes/not-found.component.ts
*Objetivo: Mostrar un mensaje cuando la dirección visitada no tenga componente asociado
**/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styles: [`
    #error404{
      width: 100%;
    }
  `]
})
export class NotFoundComponent implements OnInit {
  constructor() { }
  ngOnInit() {  }
}
