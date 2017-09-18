/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\libro.component.ts
*Objetivo: Mostrar información de un libro específico
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LibrosService, Libro } from './../servicios'

@Component({
  templateUrl: './libro.component.html',
  styles: [`
      .previa {
        width: 150px;
        height: 206px;
        margin-top:5px;
      }
  `]
})
export class LibroComponent implements OnInit {
  libro: Libro;

constructor(private libroService: LibrosService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    // Obtiene el id del libro
    let id = this.route.snapshot.params['id'];
    // Llama al servicio
    this.libroService.obtener(id).subscribe(
      libro =>{
        this.libro = libro;
      },
      error =>{
        // Si el libro no existe
        if(error.status == 404){
          this.router.navigate(['/error404']);
        }
      }
    );
  }

  // Para escuchar el evento que confirma que el libro se ha catalogado
  onNotify(message: string){
    this.libro.catalogado = true;
  }

  // Redirigir a la vista de un ejemplar
  linkEjemplar(id: number){
    this.router.navigate(['/consultar/ejemplar/'+id]);
  }
}
