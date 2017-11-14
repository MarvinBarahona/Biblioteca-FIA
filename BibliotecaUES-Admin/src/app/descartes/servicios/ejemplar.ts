/*
*Nombre de la clase: ejemplar
*Dirección: /src/app/descartes/servicios/ejemplar.ts
*Objetivo:
*/

import { Libro } from './';

export class Ejemplar{
  id: number;
  codigo: string;
  estado: string;
  ultimaTransaccion: Date;
  agregar: boolean;
  libro: Libro;
}
