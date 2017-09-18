// Clase Intercambio

import { Ejemplar } from './';

export class Intercambio{
  id: number;
  facultad: string;
  usuario: string;
  ejemplares: Ejemplar[];
  fecha: Date;
  relacionado: number;
}
