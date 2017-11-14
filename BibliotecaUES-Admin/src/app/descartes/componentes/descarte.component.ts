/*
*Nombre del componente: descarte
*Dirección física: src/app/descartes/componentes/descarte.component.ts
*Objetivo: Mostrar el detalle de ejemplares descartados conjuntamente.
**/

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DescartesService, Descarte } from './../servicios';


@Component({
  templateUrl: './descarte.component.html'
})

export class DescarteComponent implements OnInit {
  descarte: Descarte;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private descartesService: DescartesService
  ) { }

  ngOnInit(): void {
    // Obtiene el id del intercambio
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.descartesService.obtener(id).subscribe(
      descarte =>{
        this.descarte = descarte;
      },
      error =>{
        //Si el descarte no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

}
