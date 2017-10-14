/*
*Nombre del componente: sugerencias-nueva-docente
*Dirección física: src\app\sugerencias\componentes\sugerencia-nueva-docente.component.ts
*Objetivo: Crear sugerencia de un docente
**/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { SugerenciasService, Carrera, Sugerencia } from './../servicios'

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './sugerencia-nueva-docente.component.html'
})
export class SugerenciaNuevaDocenteComponent implements OnInit {
  carreras: Carrera[];
  carreraSelect: Carrera;
  sugerencia: Sugerencia;
  idMateria: number;

  showMessage: boolean;
  errorMessage: string;
  showFailMessage: boolean;
  linkId: string;

  constructor(
    private sugerenciasService: SugerenciasService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sugerencia = new Sugerencia;
    this.showFailMessage = false;
    this.showMessage = false;

    // Recuperar las carreras e inicializar autocompletado
    this.sugerenciasService.obtenerCarreras().subscribe(
      carreras => {
        this.carreras = carreras;
        // Para actualizar la vista del select
        this.cd.detectChanges();
        this.carreraSelect = this.carreras[0];
        this.inicializarAutocompletado();
      }
    );
  }

  //Método: crear
  //Objetivo: Crear una nueva sugerencia.
  crear() {
    this.showMessage = true;
    this.errorMessage = null;
    this.showFailMessage = false;

    // Consumir el servicio de creación
    this.sugerenciasService.crear(this.sugerencia, this.idMateria, true).subscribe(
      (r) => {
        if(r['saved']) this.router.navigate(['/sugerencias']);
        else{
          this.showFailMessage = true;
          this.showMessage = false;
          this.linkId = r['suggestionId'];
        }
      },
      (error) => {
        let r = error.json();
        let errors = r['errors'];
        this.showFailMessage = true;
        this.showMessage = false;
        this.linkId = errors['suggestionId'];
      }
    );
  }

  //Método: linkSugerencia
  //Objetivo: Redireccionar a la vista de la sugerencia
  linkSugerencia(){
    this.router.navigate(['/sugerencias/votar/'+this.linkId]);
  }

  //Método: selectCarrera
  //Objetivo: Método invocado al seleccionar una carrera del select, cambia de carrera y reasigna el autocompletado
  selectCarrera(val: string) {
    this.carreras.forEach((carrera) => {
      if (carrera.nombre == val) {
        this.carreraSelect = carrera
        this.inicializarAutocompletado();
      }
    });
  }

  //Método: inicializarAutocompletado
  //Objetivo: inicializar el campo de materia con autocompletado
  inicializarAutocompletado() {
    let data = {};
    this.carreraSelect.materias.forEach((materia) => {
      data[materia.codigo + " - " + materia.nombre] = null;
    });

    // Método para iniciar el autocompletado
    $('#materia').autocomplete({
      data: data,
      limit: 5,
      minLength: 1,
      onAutocomplete: (val: string) => {
        // Asignar la carrera al autocompletar
        this.carreraSelect.materias.forEach((materia) => {
          if (val.startsWith(materia.codigo)) this.idMateria = materia.id;
        });
      }
    });
  }
}
