/*
*Nombre del componente: libro
*Dirección física: src\app\libros\componentes\libro.component.ts
*Objetivo: Mostrar información de un libro específico
**/
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { LibrosService, Libro } from './../servicios'

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './libro.component.html',
  styles: [`
      .previa {
        width: 150px;
        height: 206px;
        margin-top:5px;
      }
  `]
})
export class LibroComponent implements OnInit {
  libro: Libro;

  modalReservar = new EventEmitter<string | MaterializeAction>();

constructor(
  private libroService: LibrosService,
  private route: ActivatedRoute,
  private router: Router
){}

  ngOnInit() {
    // Obtiene el id del libro
    let id = this.route.snapshot.params['id'];
    // Llama al servicio
    this.libroService.obtener(id).subscribe(
      libro =>{
        this.libro = libro;
      },
      error =>{
        // Si el libro no existe
        if(error.status == 404){
          this.router.navigate(['/error404']);
        }
      }
    );
  }

  // Métodos para el manejo de la ventana modal de renovación.
  openReservar() {
    this.modalReservar.emit({ action: "modal", params: ['open'] });
  }
  closeReservar() {
    this.modalReservar.emit({ action: "modal", params: ['close'] });
  }Reservar
}
