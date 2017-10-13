/*
*Nombre de la clase: ejemplar
*Dirección: /src/app/intercambios/servicios/ejemplar.ts
*/

import { Libro } from './';

export class Ejemplar{
  id: number;
  codigo: string;
  estado: string;
  libro: Libro;
  ingresado: boolean;
}
