/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libro-seleccion\componentes\libro-nuevo.component.ts
*Objetivo: Crear un nuevo libro
*/

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  // Para emitir evento con el libro creado
  @Output() eventEmitter: EventEmitter<Libro> = new EventEmitter<Libro>();

  autorAutocomplete: any;
  editorialAutocomplete: any;

  showMessage: boolean = false;
  errorMessage: string

  constructor(private libroService: LibroSeleccionService) { }

  ngOnInit() {
    this.libro = new NuevoLibro;
    this.libro.autores = new Array<string>();
    this.inicializarAutocompletado();
  }

  // Método: crear
  // Objetivo: Crear un nuevo libro con los datos del formulario.
  crear(form: any) {
    this.showMessage = true;
    this.errorMessage = null;
    // Llamando al servicio
    this.libroService.crear(this.libro, this.autores, this.editoriales).subscribe(
      libro => {
        // Emite el libro para comunicarse con otro componente.
        this.eventEmitter.emit(libro);
        // Muestra un toast con el mensaje de creación
        Materialize.toast('Libro creado', 3000);
        this.limpiar(form);
      },
      error => {
        // Muestra un mensaje de error.
        this.showMessage = false;
        this.errorMessage = "El ISBN ingresado ya está registrado";
      }
    );
  }

  // Método: limpiar
  // Objetivo: limpiar el formulario
  limpiar(form: any){
    this.showMessage = false;
    form.reset();
    this.inicializarAutocompletado();
  }

  // Método: inicializarAutocompletado
  // Objetivo: Inicializar los componentes con autocompletado
  inicializarAutocompletado() {
    this.libroService.obtenerAutoLibro().subscribe(
      r => {
        // Guarda los autores y editoriales registradas en el sistema.
        this.autores = r['autores'];
        this.editoriales = r['editoriales'];

        // Transforma los autores en un objeto para el autocompletado.
        let autoresData = {};
        this.autores.forEach(function(autor) {
          autoresData[autor.nombre] = null;
        });

        // Inicializar el campo con autocompletado.
        $('#autores').material_chip({
          autocompleteOptions: {
            data: autoresData,
            limit: 5,
            minLength: 1
          }
        });

        // // Transforma las editoriales en un objeto para el autocompletado.
        let editorialesData = {};
        this.editoriales.forEach(function(editorial) {
          editorialesData[editorial.nombre] = null;
        });

        // Inicializar el campo con autocompletado.
        $('#editorial').autocomplete({
          data: editorialesData,
          limit: 5,
          minLength: 1,
          onAutocomplete: (val) => {
            this.libro.editorial = val;
          }
        });

        // Agrega los métodos para vincular el autocompletado con los autores.
        $('#autores').on('chip.add', (e, chip) => {
          let i = this.libro.autores.indexOf(chip.tag);
          if (i == -1) this.libro.autores.push(chip.tag);
        });

        $('#autores').on('chip.delete', (e, chip) => {
          let i = this.libro.autores.indexOf(chip.tag);
          if (i > -1) this.libro.autores.splice(i, 1);
        });
      }
    );
  }
}
