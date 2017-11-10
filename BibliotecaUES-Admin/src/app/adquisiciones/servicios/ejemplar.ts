/*
*Nombre de la clase: Ejemplar
*Dirección: /src/app/adquisiciones/servicios/ejemplar.ts
*Objetivo:
*/

import { Libro } from './';

export class Ejemplar{
  id: number;
  codigo: string;
  estado: string;
  ingresado: boolean;
  libro: Libro;
}
