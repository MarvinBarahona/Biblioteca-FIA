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
  dtOptions: DataTables.Settings = {};
  libros: Libro[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private librosService: LibrosService, private router: Router) {
    this.dtOptions = {
      pageLength: 5,
      // dom: 'lrtpif',
      pagingType: 'simple_numbers',
      lengthMenu: [2,3,5]
    };
  }

  ngOnInit(): void {
    this.librosService.obtenerTodos().subscribe(
      libros => {
        this.libros = libros;
        this.dtTrigger.next();
      }
    );
  }

  linkLibro(libro: Libro){
    this.router.navigate(["/libros/"+libro.id])
  }
}
