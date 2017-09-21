/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\libros.component.ts
*Objetivo: Mostrar el listado de libros disponibles en una tabla
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { LibrosService, Libro } from './../servicios';

@Component({
  templateUrl: './libros.component.html'
})
export class LibrosComponent implements OnInit {
  libros: Libro[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private librosService: LibrosService, private router: Router) {
    // Opciones del datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10,15,20],
      order: [[3, 'asc']],
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
    // Llama al servicio
    this.librosService.obtenerTodos().subscribe(
      libros => {
        // Asigna los libros y refresca la tabla
        this.libros = libros;
        this.dtTrigger.next();
      }
    );
  }

  // Redirige a la vista individual del libro
  linkLibro(libro: Libro){
    this.router.navigate(["/libros/"+libro.id])
  }
}
