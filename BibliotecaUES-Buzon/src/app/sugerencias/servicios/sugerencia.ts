// Clase sugerencia del módulo de sugerencias

import { Materia } from './';

export class Sugerencia{
  id: number;
  titulo: string;
  autor:string;
  editorial: string;
  edicion: number;
  isbn: string;
  votos: number;
  pedidos: number;

  precio: number;
  cantidad: number;

  materias: Materia[];

  usuario: boolean;
}
