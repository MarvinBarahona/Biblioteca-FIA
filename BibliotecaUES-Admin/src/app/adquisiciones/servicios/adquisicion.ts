/*
*Nombre de la clase: adquisicion
*Dirección: /src/app/adquisiciones/servicios/adquisicion.ts
*/

import { Ejemplar } from './';

export class Adquisicion{
  id: number;
  nombre: string;
  fecha: Date;
  usuario: string;
  individual: boolean;
  tipo: string;
  donante: string;
  ejemplares: Ejemplar[];
}
