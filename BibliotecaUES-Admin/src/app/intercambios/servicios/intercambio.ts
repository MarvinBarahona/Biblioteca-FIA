// Clase Intercambio

import { Ejemplar } from './';

export class Intercambio{
  id: number;
  facultad: string;
  entradas: Ejemplar[];
  salidas: Ejemplar[];
  fecha: Date;
  completo: boolean;
}
