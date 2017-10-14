/*
*Nombre de la clase: ejemplar
*Dirección física: src/app/consultar/servicios/ejemplar.ts
**/

import { Transaccion, Libro } from './'

export class Ejemplar{
  id: number;
  codigo: string;
  estado: string;
  transacciones: Transaccion[];
  libro: Libro;
}
