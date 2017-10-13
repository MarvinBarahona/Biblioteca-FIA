/*
*Nombre del componente: intercambios
*Dirección física: src\app\intercambios\componentes\intercambios.component.ts
*Objetivo: Permite ver una tabla con todos los intercambios
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { IntercambiosService, Intercambio } from './../servicios/';

@Component({
  templateUrl: './intercambios.component.html'
})
export class IntercambiosComponent implements OnInit {
  intercambios: Intercambio[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private intercambiosService: IntercambiosService,
    private router: Router
  ) {
    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10,15,20],
      order: [[1, "desc"], [0, "asc"]],
      language: {
        "emptyTable": "Sin registros disponibles en la tabla",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "",
        "infoFiltered": "(filtrados de _MAX_ totales )",
        "lengthMenu": "Mostrando _MENU_ registros",
        "search": "Buscar:",
        "zeroRecords": "Búsqueda sin resultados",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      }
    };
  }

  ngOnInit() {
    // Llamar al servicio
    this.intercambiosService.obtenerTodos().subscribe(
      intercambios => {
        // Asignar los intercambios y refrescar la tabla;
        this.intercambios = intercambios;
        this.dtTrigger.next();
      }
    );
  }

  // Método: linkSalida
  // Objetivo: Redirige a la vista de intercambio
  linkSalida(salida: Intercambio){
    this.router.navigate(["/intercambios/salida/" + salida.id]);
  }
}
