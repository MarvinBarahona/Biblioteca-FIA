/*
*Nombre de la clase: sugerencia
*Dirección física: src/app/sugerencias/servicios/sugerencia.ts
**/

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
