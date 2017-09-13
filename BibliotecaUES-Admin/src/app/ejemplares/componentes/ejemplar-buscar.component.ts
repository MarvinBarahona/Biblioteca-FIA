/*
*Nombre del módulo: Gestión de ejemplares
*Dirección física: src\app\ejemplares\componentes\ejemplar-buscar.component.ts
*Objetivo: Buscar ejemplares por medio del código de barra
**/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EjemplaresService, Ejemplar } from './../servicios';

declare var $:any;

@Component({
  templateUrl: './ejemplar-buscar.component.html',
  styles: [`
      .search {
        margin-top:25px;
        left: -25px;
      }
      `]
})
export class EjemplarBuscarComponent implements OnInit {
  ejemplares: Ejemplar[];
  codigos = Array<string>();
  ejemplar: Ejemplar;
  codigo: string;
  message: string = "No se encontraron resultados"

  constructor(private ejemplaresService: EjemplaresService, private router: Router) { }

  ngOnInit() {
    this.inicializarAutocompletado();
  }

  // Inicializar input con opciones de autocompletar
  inicializarAutocompletado(){
    this.ejemplaresService.obtenerTodos().subscribe(
      ejemplares => {
        this.ejemplares = ejemplares;

        var i=0;
        for(var i:number; i<this.ejemplares.length; i++){
          if(ejemplares[i].codigo != null){
            this.codigos.push(ejemplares[i].codigo);
          }
        }

        // Transforma los códigos en un objeto para el autocompletado
        let codigosData = {};
        this.codigos.forEach(function(codigo){
          codigosData[codigo] = null;
        });

        // Inicializar el campo con autocompletado
        $('#codigo').autocomplete({
          data: codigosData,
          limit: 5,
          minLength: 3
        });
      }
    );
  }

  //Buscar un libro por medio del código de barra
  buscar(){
    this.ejemplar = null;
    this.message = "Buscando...";


    let codigo = $("#codigo").val();
    this.ejemplaresService.obtenerPorCodigo(codigo).subscribe(
      ejemplar => {
        this.ejemplar = ejemplar;
      },
      error => {
        this.message = "No se encontraron resultado para " + this.codigo;
      }
    )
  }

  // Redirigir a la vista de un libro
  linkLibro(id: number){
    this.router.navigate(['/libros/'+id]);
  }

  // Redirigir a la vista de un ejemplar
  linkEjemplar(id: number){
    this.router.navigate(['/ejemplares/'+id]);
  }
}
