/*
*Nombre de la clase: intercambio
*Dirección: /src/app/intercambios/servicios/intercambio.ts
*/

import { Ejemplar } from './';

export class Intercambio{
  id: number;
  facultad: string;
  usuario: string;
  ejemplares: Ejemplar[];
  fecha: Date;
  relacionado: number;
}
