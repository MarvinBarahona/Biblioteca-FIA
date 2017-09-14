/*
*Nombre del módulo: Gestión de libros
*Dirección física: src\app\libros\componentes\libro.component.ts
*Objetivo: Mostrar información de un libro específico
**/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { LibrosService, Libro } from './../servicios'

@Component({
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit {
  libro: Libro;
  catalogador: boolean;

  constructor(
    private libroService: LibrosService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ){}

  ngOnInit() {
    // Obtiene el id del libro
    let id = this.route.snapshot.params['id'];

    // Determina si el usuario tiene los permisos de catalogación
    let user = this.cookieService.getObject('usuario');
    let i = user['politicas'].indexOf(122);
    this.catalogador = i > -1;

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
    this.router.navigate(['/ejemplares/'+id]);
  }
}
