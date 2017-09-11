/*
*Nombre del módulo: Gestión de adquisiciones
*Dirección física: src\app\adquisiciones\componentes\adquisiciones.component.ts
*Objetivo: Mostrar una tabla con las diferentes adquisiciones
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { AdquisicionesService, Adquisicion } from './../servicios';

@Component({
  templateUrl: './adquisiciones.component.html'
})

export class AdquisicionesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  adquisiciones: Adquisicion[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private adquisicionesService: AdquisicionesService, private router: Router) {
    this.dtOptions = {
      pageLength: 5,
      // dom: 'lrtpif',
      pagingType: 'simple_numbers',
      lengthMenu: [2,3,5]
    };
  }

  ngOnInit(): void {
    this.adquisicionesService.obtenerTodos().subscribe(
      adquisiciones => {
        this.adquisiciones = adquisiciones;
        this.dtTrigger.next();
      }
    );
  }

  linkAdquisicion(adquisicion: Adquisicion){
    this.router.navigate(["/adquisiciones/"+adquisicion.id])
  }
}
