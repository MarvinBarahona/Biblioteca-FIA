/*
*Nombre del componente: traslados
*Dirección física: /src/app/traslados/traslados.component.ts
*Objetivo: Cambiar el estado de un ejemplar cuando este pasa del área de jefatura a la biblioteca.
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EjemplaresService, Ejemplar }  from './servicios';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './traslados.component.html',
  styles: [`
    .search{
      margin-top: 20px;
      left:-20px;
    }
  `]
})

export class TrasladosComponent implements OnInit {
  ejemplares: Ejemplar[];
  codigos = Array<string>();
  ejemplar: Ejemplar;
  codigo: string;
  message: string = "No se encontraron resultados";

  constructor(
    private ejemplaresService: EjemplaresService,
    private router: Router) { }

  ngOnInit() {
    // Activar el nav en responsive e inicializar el autocompletado en el buscador.
    $("#toogle_menu").sideNav({closeOnClick: true});
    this.inicializarAutocompletado();
  }

  //Método: inicializarAutocompletado
  //Objetivo: Inicializar input con opciones de autocompletar
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
        this.codigos.forEach((codigo)=>{
          codigosData[codigo] = null;
        });
        // Inicializar el campo con autocompletado
        $('#codigo').autocomplete({
          data: codigosData,
          limit: 5,
          minLength: 2,
          onAutocomplete: (val) => {
            this.codigo = val;
          }
        });
      }
    );
  }

  //Método: buscar
  //Objetivo: Buscar un libro por medio del código de barra
  buscar(){
    this.ejemplar = null;
    this.message = "Buscando...";

    // Consumir servicio de búsqueda.
    this.ejemplaresService.obtenerPorCodigo(this.codigo).subscribe(
      ejemplar => {
        this.message = null;
        this.ejemplar = ejemplar;
      },
      error => {
        this.message = "No se encontraron resultado para " + this.codigo;
      }
    );
  }

  //Método: trasladar
  //Objetivo: registrar el traslado de un ejemplar
  trasladar(){
    this.message = "Trasladando...";
    // Consumir servicio de traslado
    this.ejemplaresService.trasladar(this.ejemplar.id).subscribe(
      message => {
        this.message = null;
        this.ejemplar.estado = this.ejemplar.estado == 'Disponible'? 'Inactivo':'Disponible';
        Materialize.toast("Ejemplar trasladado", 3000, 'toastSuccess');
      },
      error => {
        this.message = "Error trasladando ejemplar";
      }
    )
  }
}
