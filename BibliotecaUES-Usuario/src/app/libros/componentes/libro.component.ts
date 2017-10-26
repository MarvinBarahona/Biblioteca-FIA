/*
*Nombre del componente: libro
*Dirección física: src\app\libros\componentes\libro.component.ts
*Objetivo: Mostrar información de un libro específico
**/
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { LibrosService, Libro, ReservacionesService, Ejemplar } from './../servicios'

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

      .modal{
        width: 400px;
        height: 200px;
      }
  `]
})
export class LibroComponent implements OnInit {
  libro: Libro;
  ejemplar: Ejemplar;
  logueado: boolean;
  fechaFin: string;

  modalReservar = new EventEmitter<string | MaterializeAction>();

  constructor(
    private libroService: LibrosService,
    private reservacionesService: ReservacionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtiene el id del libro, y determina si el usuario está logueado
    let id = this.route.snapshot.params['id'];
    this.logueado = sessionStorage.getItem('usuario')? true: false;

    // Llama al servicio
    if(this.logueado){
      // Si está logueado, llama al servicio de obteción con protección de política
      this.reservacionesService.obtener(id).subscribe(
        libro => {
          this.libro = libro;
        },
        error => {
          // Si el libro no existe
          if (error.status == 404) {
            this.router.navigate(['/error404']);
          }
        }
      );
    }
    else{
      // Si no está logueado, llama al servicio público
      this.libroService.obtener(id).subscribe(
        libro => {
          this.libro = libro;
        },
        error => {
          // Si el libro no existe
          if (error.status == 404) {
            this.router.navigate(['/error404']);
          }
        }
      );
    }
  }

  // Método: reservar
  // Objetivo: Reservar un ejemplar.
  reservar(){
    this.reservacionesService.reservacion(this.ejemplar.id, this.libro.titulo).subscribe(
      msg => {
        this.closeReservar();
        this.ejemplar.estado = "Reservado";
        Materialize.toast("Ejemplar reservado", 3000, "toastSuccess");
      },
      error => {
        // Si sobrepasa el límite establecido.
        if (error.status == 422) {
          Materialize.toast("¡No puedes reservar más libros!", 3000, "toastError");
        }
        else if(error.status == 403){
          Materialize.toast("No tienes permisos para reservar libros", 3000, "toastError");
        }
        else{
          Materialize.toast("Error al reservar el ejemplar", 3000, "toastError");
        }
      }
    );
  }

  // Métodos para el manejo de la ventana modal de renovación.
  openReservar(ejemplar: Ejemplar) {
    // Asignar el ejemplar mandado.
    this.ejemplar = ejemplar;

    // Asignar hora de cancelación de la reservación;
    let hora = (new Date).getHours();
    if(hora <= 8 ) this.fechaFin = "Hoy a las 12:00 md";
    else if(hora < 12) this.fechaFin = "Hoy a las " + (hora + 4) + ":00";
    else if(hora < 16) this.fechaFin = "Hoy a las 16:00";
    else this.fechaFin = "Mañana a las 12:00";

    // Abrir modal
    this.modalReservar.emit({ action: "modal", params: ['open'] });
  }
  closeReservar() {
    this.modalReservar.emit({ action: "modal", params: ['close'] });
  }
}
