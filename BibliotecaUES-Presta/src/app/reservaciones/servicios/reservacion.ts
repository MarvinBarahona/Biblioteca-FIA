/*
*Nombre de la clase: reservacion
*Dirección física: src/app/reservaciones/servicios/reservacion.ts
**/

import { Prestamista, Ejemplar } from './';

export class Reservacion{
  id: number;
  prestamista: Prestamista;
  ejemplar: Ejemplar;
  fecha: Date;
  fechaDevolucion: Date;
  activa: boolean;
}
