/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libro-seleccion\componentes\libro-nuevo.component.ts
*Objetivo: Crear un nuevo libro
**/

import { Component, OnInit } from '@angular/core';

import { LibroSeleccionService, NuevoLibro, Libro, AutoData } from './../servicios';

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'libro-nuevo',
  templateUrl: './libro-nuevo.component.html'
})

export class LibroNuevoComponent implements OnInit {
  libro: NuevoLibro;
  autores: AutoData[];
  editoriales: AutoData[];

  autorAutocomplete: any;
  editorialAutocomplete: any;

  message: string;

  constructor(private libroService: LibroSeleccionService) { }

  ngOnInit() {
    this.libro = new NuevoLibro;
    this.libro.autores = new Array<string>();
    this.inicializarAutocompletado();
  }

  crear(form: any) {
    this.message = "Creando libro..."
    this.libroService.crear(this.libro, this.autores, this.editoriales).subscribe(
      libro => {
        this.message = null;
        Materialize.toast('Libro creado', 3000);
        form.reset();
      },
      error => {
        this.message = null;
        Materialize.toast('El ISBN ingresado ya está registrado', 3000);
      }
    );
  }

  inicializarAutocompletado() {
    this.libroService.obtenerAutoLibro().subscribe(
      r => {
        this.autores = r['autores'];
        this.editoriales = r['editoriales'];

        let autoresData = {};
        this.autores.forEach(function(autor) {
          autoresData[autor.nombre] = null;
        });

        $('#autores').material_chip({
          autocompleteOptions: {
            data: autoresData,
            limit: 5,
            minLength: 1
          }
        });

        let editorialesData = {};
        this.editoriales.forEach(function(editorial) {
          editorialesData[editorial.nombre] = null;
        });

        $('#editorial').autocomplete({
          data: editorialesData,
          limit: 5,
          minLength: 1
        });
      }
    );
  }

  agregarAutor(chip: any){
    let i = this.libro.autores.indexOf(chip.tag);
    if (i == -1) this.libro.autores.push(chip.tag);
  }

  eliminarAutor(chip: any){
    let i = this.libro.autores.indexOf(chip.tag);
    if (i > -1) this.libro.autores.splice(i, 1);
  }
}
