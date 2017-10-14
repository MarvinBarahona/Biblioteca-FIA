/*
*Nombre del componente: sugerencia
*Dirección física: src\app\sugerencias\componentes\sugerencia.component.ts
*Objetivo: Ver el detalle de una sugerencia
**/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SugerenciasService, Sugerencia, Carrera, Materia } from './../servicios';

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './votar.component.html',
  styles: [`
    button {
      margin-top: 20px;
    }
  `]
})
export class VotarComponent implements OnInit {
  sugerencia: Sugerencia;
  materia: Materia;
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

    // Recuperar las carreras
    this.sugerenciasService.obtenerCarreras().subscribe(
      carreras => {
        this.carreras = carreras;
        // Para actualizar la vista del select
        this.cd.detectChanges();
        this.carreraSelect = this.carreras[0];
      }
    );

    // Recuperar la sugerencia
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
    // Consumir el servicio de votación
    this.sugerenciasService.votar(this.sugerencia.id, idMateria).subscribe(
      message => {
        // Agregar voto a la materia
        this.sugerencia.usuario = true;
        this.sugerencia.materias.forEach((materia)=>{
          if(materia.id = idMateria){
            materia.votos++;
            materia.usuario = true;
          }
        });
        Materialize.toast("Voto agregado", 3000);
      },
      error => {
        Materialize.toast("Error al agregar voto", 3000);
      }
    );
  }

  //Método: agregar
  //Objetivo: Agregar una materia (con su primero voto) a una materia.
  agregar(){
    let existe = false;
    this.sugerencia.materias.forEach((materia)=>{
      if(materia.id == this.materia.id) existe = true;
    });

    // Si la materia ya fue agregada, se agrega el voto a través del método "votar"
    if(existe) this.votar(this.materia.id);

    else{
      // Consumir el servicio de votación
      this.sugerenciasService.votar(this.sugerencia.id, this.materia.id).subscribe(
        message => {
          // Agregar la materia a la vista.
          this.sugerencia.usuario = true;
          this.materia.votos = 1;
          this.materia.pedidos = 0;
          this.materia.usuario = true;
          this.sugerencia.materias.push(this.materia);

          Materialize.toast("Voto agregado", 3000);
        },
        error => {
          Materialize.toast("Error al agregar voto", 3000);
        }
      );
    }
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
          if (val.startsWith(materia.codigo)) this.materia = materia;
        });
      }
    });
  }
}
