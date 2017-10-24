/*
*Nombre de la clase: prestamo
*Dirección física: src/app/prestamos/servicios/transaccion.ts
**/

import { Prestamista, Ejemplar } from './';

export class Transaccion{
  id: number;
  esPrestamo: boolean;
  fecha: Date;
  autoriza: string;
  prestamista: Prestamista;
  fechaDevolucion: Date;
  ejemplar: Ejemplar;
}
