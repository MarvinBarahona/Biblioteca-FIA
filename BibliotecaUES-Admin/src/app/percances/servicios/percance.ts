/*
*Nombre de la clase: percance
*Dirección: /src/app/percances/servicios/percance.ts
*/

import { Ejemplar } from './';

export class Percance{
  id: number;
  prestamista: string;
  fecha: Date;
  resuelto: boolean;
  ejemplar: Ejemplar;
}
