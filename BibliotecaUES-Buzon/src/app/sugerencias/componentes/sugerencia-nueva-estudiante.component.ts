/*
*Nombre del módulo: Gestión de sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencia-nueva-estudiante.component.ts
*Objetivo: Crear sugerencia de un estudiante
**/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { SugerenciasService, Carrera, Sugerencia } from './../servicios'

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './sugerencia-nueva-estudiante.component.html'
})
export class SugerenciaNuevaEstudianteComponent implements OnInit {
  carreras: Carrera[];
  carreraSelect: Carrera;
  sugerencia: Sugerencia;
  idMateria: number;

  message: string;
  errorMessage: string;

  constructor(
    private sugerenciasService: SugerenciasService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sugerencia = new Sugerencia;

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

  crear() {
    this.message = "Guardando la sugerencia...";
    this.errorMessage = null;

    this.sugerenciasService.crear(this.sugerencia, this.idMateria, false).subscribe(
      (message) => {
        console.log(message);
      }
    );
  }

  // Al seleccionar una carreras
  selectCarrera(val: string) {
    this.carreras.forEach((carrera) => {
      if (carrera.nombre == val) {
        this.carreraSelect = carrera
        this.inicializarAutocompletado();
      }
    });
  }

  // Inicializar el campo con autocompletado.
  inicializarAutocompletado() {
    let data = {};
    this.carreraSelect.materias.forEach((materia) => {
      data[materia.codigo + " - " + materia.nombre] = null;
    });

    $('#materia').autocomplete({
      data: data,
      limit: 5,
      minLength: 1,
      onAutocomplete: (val: string) => {
        this.carreraSelect.materias.forEach((materia) => {
          if (val.startsWith(materia.codigo)) this.idMateria = materia.id;
        });
      }
    });
  }

}
