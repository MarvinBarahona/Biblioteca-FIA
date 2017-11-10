/*
*Nombre del componente: sugerencia
*Dirección física: src/app/sugerencias/componentes/sugerencia.component.ts
*Objetivo: Mostrar el detalle de una sugerencia.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { SugerenciasService, Sugerencia, Voto, Pedido } from './../servicios';

declare var Materialize: any;

@Component({
  templateUrl: './sugerencia.component.html',
  styles: [`
    .modal{
      height: 300px;
      width: 500px;
    }
  `]
})
export class SugerenciaComponent implements OnInit {
  sugerencia: Sugerencia;

  precio: number;
  cantidad: number;
  razon: string;

  modalAprobar = new EventEmitter<string | MaterializeAction>();
  modalDenegar = new EventEmitter<string | MaterializeAction>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sugerenciasService: SugerenciasService
  ) {

  }

  ngOnInit(): void {
    // Obtiene el id del sugerencia
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.sugerenciasService.obtener(id).subscribe(
      sugerencia =>{
        this.sugerencia = sugerencia;
      },
      error =>{
        // Si el sugerencia no existe
        if(error.status == 404){
          this.router.navigate(['/error404']);
        }
      }
    );
  }

  // Métodos para la ventana modal para aprobar sugerencia
  openAprobar() {
    this.modalAprobar.emit({action:"modal",params:['open']});
  }
  closeAprobar() {
    this.modalAprobar.emit({action:"modal",params:['close']});
  }

  // Método: aprobar
  // Objetivo: Aprobar el ejemplar.
  aprobar(){
    if(this.precio == null || this.precio < 1){
      Materialize.toast("Ingrese un precio mayor que 1", 3000, "toastError");
    }
    else if(this.cantidad == null || this.cantidad < 1){
      Materialize.toast("Ingrese una cantidad mayor que 1", 3000, "toastError");
    }
    else{
      this.sugerencia.cantidad = this.cantidad;
      this.sugerencia.precio = this.precio;
      this.sugerenciasService.aprobar(this.sugerencia).subscribe(
        (msg)=>{
          this.sugerencia.estado = "Aceptada";
          Materialize.toast("Sugerencia aprobada", 3000, "toastSuccess");
          this.closeAprobar();
        },
        (error)=>{
          Materialize.toast("Error al aprobar la sugerencia", 3000, "toastError");
        }
      );
    }
  }

  // Métodos para la ventana modal para denegar sugerencia
  openDenegar() {
    this.modalDenegar.emit({action:"modal",params:['open']});
  }
  closeDenegar() {
    this.modalDenegar.emit({action:"modal",params:['close']});
  }

  // Método: denegar
  // Objetivo: Denegar sugerencia.
  denegar(){
    if(!this.razon){
      Materialize.toast("Ingrese la razón de la negación", 3000, "toastError");
    }
    else{
      this.sugerencia.razonRechazo = this.razon;
      this.sugerenciasService.rechazar(this.sugerencia).subscribe(
        (msg)=>{
          this.sugerencia.estado = "Rechazada";
          Materialize.toast("Sugerencia rechazada", 3000, "toastSuccess");
          this.closeDenegar();
        },
        (error)=>{
          Materialize.toast("Error al rechazar la sugerencia", 3000, "toastError");
        }
      );
    }
  }
}
