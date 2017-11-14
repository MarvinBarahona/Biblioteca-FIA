/*
*Nombre del componente: descarte-nuevo
*Dirección física: src/app/descarte/componentes/descarte-nuevo.component.ts
*Objetivo: Realizar el descarte de uno o varios ejemplares
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { DescartesService, Descarte, Ejemplar } from './../servicios';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './descarte-nuevo.component.html'
})

export class DescarteNuevoComponent implements OnInit {
  descarte: Descarte;
  candidatos: Ejemplar[];

  modalCancel = new EventEmitter<string | MaterializeAction>();

  constructor(
    private router: Router,
    private descartesService: DescartesService
  ) {}

  ngOnInit(): void {
    this.descartesService.obtenerCandidatos().subscribe(
      (candidatos) => {this.candidatos = candidatos;}
    );
  }

  // Método: selectAll
  // Objetivo: Cambia la selección de los candidatos con el checkbox principal
  selectAll(e: any){
    this.candidatos.forEach((candidato)=>{candidato.agregar = e.target.checked});
  }

  // Método: descartar
  // Objetivo: registrar el descarte
  descartar(){
    let seleccionados = new Array<Ejemplar>();
    let valido = true;

    this.candidatos.forEach((candidato) => {
        if(candidato.agregar){
          seleccionados.push(candidato);
          if(valido && candidato.estado != "Inactivo") valido = false;
        }
    });

    if(valido){
      if(seleccionados.length > 0){
        this.descarte = new Descarte;
        this.descarte.ejemplares = seleccionados;

        this.descartesService.crear(this.descarte).subscribe(
          (msg)=>{
            Materialize.toast("Descarte registrado", 3000, "toastSuccess");
            this.router.navigate(['/descartes']);
          },
          (error)=>{
            Materialize.toast("Error al registrar el descarte", 3000, "toastError");
          }
        );

      }
      else{
        Materialize.toast("Seleccione ejemplares para descartar", 3000, "toastError");
      }
    }
    else{
      Materialize.toast("Solo puede descartar ejemplares inactivos", 3000, "toastError");
    }


  }

  // Método: cancel
  // Objetivo: Cerrar la ventana modal y retornar a la vista anterior.
  cancel() {
    this.closeCancel();
    this.router.navigate(['/descartes']);
  }

  // Métodos para el manejo de la ventana modal de confirmación de cancelación.
  openCancel() {
    this.modalCancel.emit({ action: "modal", params: ['open'] });
  }
  closeCancel() {
    this.modalCancel.emit({ action: "modal", params: ['close'] });
  }
}
