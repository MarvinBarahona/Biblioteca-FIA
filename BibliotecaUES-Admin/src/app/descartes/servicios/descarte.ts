/*
*Nombre de la clase: descarte
*Dirección: /src/app/descartes/servicios/descarte.ts
*Objetivo:
*/
import { Ejemplar } from './';

export class Descarte{
  id: number;
  nombre: string;
  usuario: string;
  fecha: Date;
  ejemplares: Ejemplar[];
}
