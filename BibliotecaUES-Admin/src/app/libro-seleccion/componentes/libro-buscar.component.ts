/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libro-seleccion\componentes\libro-buscar.component.ts
*Objetivo: Buscar un libro por medio de una tabla
**/

import { Component, OnInit } from '@angular/core';
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

  constructor(private libroSeleccionService: LibroSeleccionService, private router: Router) {
    this.dtOptions = {
      pageLength: 5,
      // dom: 'lrtpif',
      pagingType: 'simple_numbers',
      lengthMenu: [2,3,5]
    };
  }

  ngOnInit(): void {
    this.libroSeleccionService.obtenerTodos().subscribe(
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
