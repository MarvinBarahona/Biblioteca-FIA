import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

// import {  } from './../servicios';

declare var $: any;

@Component({
  templateUrl: './descartes.component.html'
})

export class DescartesComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private router: Router
  ) {
    // Opciones de datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10, 15, 20],
      order: [[3, "desc"], [0, "asc"]],
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

  ngOnInit(): void {

  }
}
