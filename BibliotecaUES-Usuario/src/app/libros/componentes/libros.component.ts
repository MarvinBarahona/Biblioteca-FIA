/*
*Nombre del componente: libros
*Dirección física: src\app\libros\componentes\libros.component.ts
*Objetivo: Mostrar el listado de libros más recientes
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LibrosService, Libro } from './../servicios';

@Component({
  templateUrl: './libros.component.html',
  styles: [`
    .search{
      margin-top: 20px;
      left:-20px;
    }
  `]
})
export class LibrosComponent implements OnInit {
  libros: Libro[];
  model: any;
  mensajeResultado: string;
  buscador: any;

  constructor(private librosService: LibrosService, private router: Router) {}

  ngOnInit(): void {
    this.model = {tipo: '0'};
    this.mensajeResultado = "Libros más recientes";

    // Llama al servicio
    this.librosService.obtenerTodos().subscribe(
      libros => {
        // Asigna los libros y refresca la tabla
        this.libros = libros;
      }
    );
  }

  //Método: buscar
  //Objetivo: Permite la búsqueda de libros por diferentes criterios de búsqueda
  buscar(){
    switch(this.model.tipo){
      case '0':{
        this.model.llave = "title";
        break;
      }
      case '1':{
        this.model.llave = "isbn";
        break;
      }
      case '2':{
        this.model.llave = "authorName";
        break;
      }
      case '3':{
        this.model.llave = "publisherName";
        break;
      }
      default:{
        break;
      }
    }

    this.libros = null;
    this.mensajeResultado = "Resultados de la búsqueda";

    // Llama al servicio
    this.buscador = this.librosService.buscar(this.model.llave, this.model.valor).subscribe(
      libros => {
        // Asigna los libros y refresca la tabla
        this.libros = libros;
      }
    );
  }
}
