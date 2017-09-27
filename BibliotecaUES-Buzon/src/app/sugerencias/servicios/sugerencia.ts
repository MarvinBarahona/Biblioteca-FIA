// Clase sugerencia del módulo de sugerencias

import { Materia } from './';

export class Sugerencia{
  id: number;
  titulo: string;
  autor:string;
  editorial: string;
  edicion: number;
  isbn:string;
  precio: number;
  cantidad: number;
  materias: Materia[];
}
