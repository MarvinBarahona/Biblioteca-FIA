/*
*Nombre del módulo: Gestión de sugerencias
*Dirección física: src\app\sugerencias\componentes\sugerencia.component.ts
*Objetivo: Ver el detalle de una sugerencia
**/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SugerenciasService, Sugerencia, Carrera } from './../servicios';

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './votar.component.html'
})
export class VotarComponent implements OnInit {
  sugerencia: Sugerencia;
  idMateria: number;
  carreras: Carrera[];
  carreraSelect: Carrera;

  constructor(
    private sugerenciasService: SugerenciasService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.sugerenciasService.obtenerCarreras().subscribe(
      carreras => {
        this.carreras = carreras;
        // Para actualizar la vista del select
        this.cd.detectChanges();
        this.carreraSelect = this.carreras[0];
      }
    );

    this.sugerenciasService.obtener(id).subscribe(
      sugerencia => {
        this.sugerencia = sugerencia;

        // Espera debido a que el HTML se carga inmediatamente.
        setTimeout(() => {this.inicializarAutocompletado();}, 500);

      },
      error =>{
        //Si la sugerencia no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

  votar(idMateria: number){
    this.sugerenciasService.votar(this.sugerencia.id, idMateria).subscribe(
      message => {
        this.sugerencia.materias.forEach((materia)=>{
          if(materia.id = idMateria) materia.votos++;
        });
        Materialize.toast("Voto agregado", 3000);
      }
    );
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

    this.cd.detectChanges();
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
}
