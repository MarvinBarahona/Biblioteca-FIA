/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\libros-nuevos.component.ts
*Objetivo: Mostrar el listado de libros más recientes
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { LibrosService, Libro } from './../servicios';

@Component({
  templateUrl: './libros-nuevos.component.html'
})
export class LibrosNuevosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  libros: Libro[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private librosService: LibrosService, private router: Router) {
    // Opciones del datatable
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'simple_numbers',
      lengthMenu: [10,15,20],
      order: [[3, 'asc']]
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
