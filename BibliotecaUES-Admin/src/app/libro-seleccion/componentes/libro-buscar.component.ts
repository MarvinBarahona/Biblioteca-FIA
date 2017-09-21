/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libro-seleccion\componentes\libro-buscar.component.ts
*Objetivo: Buscar un libro por medio de una tabla
**/

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { LibroSeleccionService, Libro } from './../servicios';

@Component({
  selector: 'libro-buscar',
  templateUrl: './libro-buscar.component.html'
})
export class LibroBuscarComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  libros: Libro[];
  dtTrigger: Subject<any> = new Subject();

  // Para emitir un evento con el libro seleccionado
  @Output() eventEmitter: EventEmitter<Libro> = new EventEmitter<Libro>();

  constructor(private libroSeleccionService: LibroSeleccionService, private router: Router) {
    // Opciones del datatable
    this.dtOptions = {
      pageLength: 5,
      pagingType: 'simple_numbers',
      lengthMenu: [5],
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
    this.libroSeleccionService.obtenerTodos().subscribe(
      libros => {
        // Asigna los libros y refresca la tabla
        this.libros = libros;
        this.dtTrigger.next();
      }
    );
  }

  // Emite evento con el libro seleccionado.
  emitir(libro: Libro) {
    this.eventEmitter.emit(libro);
  }
}
