/*
*Nombre del componente: catalogado
*Dirección física: src\app\libros\componentes\catalogado.component.ts
*Objetivo: Muestra la información catalogada de un libro
**/

import { Component, Input } from '@angular/core';

import { Catalogo } from './../servicios';

@Component({
  selector: 'catalogado',
  templateUrl: './catalogado.component.html',
  styles: [`
      .previa {
        width: 150px;
        height: 206px;
        margin-top:5px;
      }
      `]
})
export class CatalogadoComponent {
  @Input() catalogo: Catalogo;
}
