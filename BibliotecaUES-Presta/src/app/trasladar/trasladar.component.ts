/*
*Nombre del módulo:
*Dirección física:
*Objetivo: Cambiar el estado de un ejemplar cuando este pasa del área de jefatura a la biblioteca.
**/

import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes, RouterModule } from '@angular/router';

import { EjemplaresService} from './ejemplares.service';

declare var $: any;

@Component({
  templateUrl: './trasladar.component.html',
  styles: [`
    #slide-out{
      margin-top: 65px;
    }

    @media (min-width: 993px){
      .component {
        padding-left: 300px;
      }
    }
  `]
})

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})

export class TrasladarComponent implements OnInit {

  // constructor() {}

  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
  }

}
