/*
*Nombre del módulo: Buscador de libros
*Dirección física: src\app\libros\componentes\libros-buscar.component.ts
*Objetivo: Mostrar los resultados de una búsqueda
**/

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './libros-buscar.component.html'
})
export class LibrosBuscarComponent implements OnInit {

  constructor(private librosService: LibrosService, private router: Router) {
  }

  ngOnInit(): void {
  }
}
