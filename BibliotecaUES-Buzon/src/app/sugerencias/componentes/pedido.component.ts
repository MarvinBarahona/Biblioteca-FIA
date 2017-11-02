import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SugerenciasService, Sugerencia, Carrera, Materia } from './../servicios';

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './pedido.component.html',
  styles: [`
    button {
      margin-top: 20px;
    }
  `]
})
export class PedidoComponent implements OnInit {
  sugerencia: Sugerencia;
  materia: Materia;
  carreras: Carrera[];
  carreraSelect: Carrera;
  pendiente: boolean;

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

    //Recuperar la sugerencia
    this.sugerenciasService.obtener(id).subscribe(
      sugerencia => {
        this.sugerencia = sugerencia;

        // Determinar si se puede hacer un pedido
        this.pendiente = this.sugerencia.estado == "Pendiente";

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

  //Método: realizarPedido
  //Objetivo: Añadir un pedido a una sugerencia existente
  realizarPedido(idMateria: number){
    // Consumir servicio
    this.sugerenciasService.agregarPedido(this.sugerencia.id, idMateria, this.sugerencia.cantidad, this.sugerencia.precio).subscribe(
      message => {
        this.sugerencia.materias.forEach((materia)=>{
          if(materia.id == idMateria){
            materia.pedidos++;
            materia.usuario = true;
            this.sugerencia.usuario = true;
          }
        });

        if(!this.sugerencia.usuario){
          this.sugerencia.usuario = true;
          this.materia.votos = 0;
          this.materia.pedidos = 1;
          this.materia.usuario = true;
          this.sugerencia.materias.push(this.materia);
        }
        Materialize.toast("Pedido agregado", 3000, 'toastSuccess');
      },
      error => {
        Materialize.toast("Error al agregar pedido.", 3000, 'toastError');
      }
    );
  }
}
