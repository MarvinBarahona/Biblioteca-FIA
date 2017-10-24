/*
*Nombre de la clase: ejemplar
*Dirección física: src/app/prestamos/servicios/ejemplar.ts
**/

import {  Libro } from './'

export class Ejemplar{
  id: number;
  codigo: string;
  estado: string;
  libro: Libro;
}
