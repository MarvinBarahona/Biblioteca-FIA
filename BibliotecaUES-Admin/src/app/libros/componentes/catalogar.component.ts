/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\catalogar.component.ts
*Objetivo: Catalogar un libro
**/
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LibrosService, Catalogo, AutoData } from './../servicios';

declare var Materialize: any;

@Component({
  selector: 'catalogar',
  templateUrl: './catalogar.component.html',
  styles: [`
    .previa {
      width: 150px;
      height: 206px;
      margin-top:5px;
    }
    `]
})
export class CatalogarComponent implements OnInit {
  @Input() catalogo: Catalogo;
  id: number;
  materias: AutoData[];

  errorMessage: string;
  showMessage: boolean = false;

  constructor(private libroService: LibrosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Llama al servicio para obtener las materias registradas.
    this.libroService.obtenerAutoCatalogo().subscribe(
      materias => {
        this.materias = materias;

        // Estructura los datos para ser agregados al autocompletado
        let materiasData = {};
        this.materias.forEach(function(materia) {
          materiasData[materia.nombre] = null;
        });

        // Construye el autocompletado.
        let chipsAutocomplete = {
          placeholder: "+ Materia",
          secondaryPlaceholder: 'Ingrese materias',
          autocompleteOptions: {
            data: materiasData,
            limit: 5,
            minLength: 3
          }
        };
      }
    );
  }

  // Método: guardarse
  // Objetivo: guardar los datos de catalogación
  guardar(){
    this.showMessage = true;
    this.errorMessage = null;

    this.libroService.catalogar(this.id, this.catalogo, this.materias).subscribe(
      message => {
        Materialize.toast("Información guardada", 3000);
      },
      error => {
        this.showMessage = false;
        this.errorMessage = "Error al guardar";
      }
    );
  }

  // Método: mostrarImagen
  // Objetivo: previsualizar la imagen antes de mandarla para guardarse.
  mostrarImagen(event: any) {
    let reader = new FileReader();
    let image: any = document.getElementById("image");
    let img = event.target.files[0];

    // Cada vez que se carga una imagen, visualizarla y asignarla al objeto catálogo.
    reader.onload = (e: any) => {
      var src = e.target.result;
      image.src = src;
      this.catalogo.img = src;
    };

    reader.readAsDataURL(img);
  }

  // Método: agregarMateria
  // Objetivo: agregar una materia al catálogo.
  agregarMateria(chip: any){
    let i = this.catalogo.materias.indexOf(chip.tag);
    if (i == -1) this.catalogo.materias.push(chip.tag);
  }

  // Método: eliminarMateria
  // Objetivo: eliminar una materia del catálogo
  eliminarMateria(chip: any){
    let i = this.catalogo.materias.indexOf(chip.tag);
    if (i > -1) this.catalogo.materias.splice(i, 1);
  }
}
