/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libro-seleccion\componentes\libro-seleccion.component.ts
*Objetivo: Dar la opción de buscar o crear un libro
**/

import { Component, Output, EventEmitter } from '@angular/core';
import { Libro } from './../servicios';

@Component({
  selector: 'libro-seleccion',
  templateUrl: './libro-seleccion.component.html'
})
export class LibroSeleccionComponent{
  // Para emitir evento con el libro creado o seleccionado
  @Output() eventEmitter: EventEmitter<Libro> = new EventEmitter<Libro>();

  // Escucha el evento y lo reemite. 
  onNotify(libro: Libro){
    this.eventEmitter.emit(libro);
  }

}
