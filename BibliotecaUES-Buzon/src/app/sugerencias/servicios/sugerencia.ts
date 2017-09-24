// Clase sugerencia del módulo de sugerencias

import { Voto, Pedido } from './';

export class Sugerencia{
  id: number;
  titulo: string;
  autor:string;
  editorial: string;
  edicion: number;
  isbn:string;
  precio: number;
  votos: number;
  _votos: Voto[];
  pedidos: number;
  _pedidos: Pedido[];
}
