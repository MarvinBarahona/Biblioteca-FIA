/*
*Nombre del módulo:
*Dirección física:
*Objetivo: Cambiar el estado de un ejemplar cuando este pasa del área de jefatura a la biblioteca.
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EjemplaresService, Ejemplar }  from './servicios'
declare var $: any;

@Component({
  templateUrl: './trasladar.component.html',
  styles: [`
    #slide-out{
      margin-top: 65px;
    }
    .search{
      margin-top: 20px;
      left:-20px;
    }
    @media (min-width: 993px){
      .component {
        padding-left: 300px;
      }
    }
  `]
})

export class TrasladarComponent implements OnInit {
  ejemplares: Ejemplar[];
  codigos = Array<string>();
  ejemplar: Ejemplar;
  codigo: string;
  message: string = "No se encontraron resultados"
  accion: string;

  constructor(private ejemplaresService: EjemplaresService, private router: Router) { }

  ngOnInit() {
    $("#toogle_menu").sideNav({closeOnClick: true});
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
          minLength: 4,
          onAutocomplete: (val) => {
            this.codigo = val;
          }
        });
      }
    );
  }

  //Buscar un libro por medio del código de barra
  buscar(){
    this.ejemplar = null;
    this.message = "Buscando...";

    this.ejemplaresService.obtenerPorCodigo(this.codigo).subscribe(
      ejemplar => {
        this.ejemplar = ejemplar;
        if(this.ejemplar.estado == "disponible"){
          this.accion = "Enviar";
        }else{
          this.accion = "Recibir";
          console.log(this.accion);
        }
      },
      error => {
        this.message = "No se encontraron resultado para " + this.codigo;
      }
    );
  }
}
