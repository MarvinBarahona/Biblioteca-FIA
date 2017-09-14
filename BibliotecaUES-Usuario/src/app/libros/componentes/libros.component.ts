/*
*Nombre del módulo: Consulta de libros
*Dirección física: src\app\libros\componentes\libros.component.ts
*Objetivo: Mostrar el listado de libros más recientes
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LibrosService, Libro } from './../servicios';

@Component({
  templateUrl: './libros.component.html'
})
export class LibrosComponent implements OnInit {
  libros: Libro[];
  mensajeResultado: string;

  constructor(private librosService: LibrosService, private router: Router) {}

  ngOnInit(): void {
    this.mensajeResultado = "Libros más recientes";

    // Llama al servicio
    this.librosService.obtenerTodos().subscribe(
      libros => {
        // Asigna los libros y refresca la tabla
        this.libros = libros;
      }
    );
  }

  // Redirige a la vista individual del libro
  linkLibro(libro: Libro){
    this.router.navigate(["/libros/"+libro.id])
  }
}
