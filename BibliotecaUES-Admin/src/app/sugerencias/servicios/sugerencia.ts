/*
*Nombre de la clase: sugerencia
*Dirección física: src/app/sugerencias/servicios/sugerencia.ts
**/

import { Voto, Pedido } from './';

export class Sugerencia{
  id: number;
  titulo: string;
  autor:string;
  editorial: string;
  edicion: number;
  isbn: string;

  votos: number;
  pedidos: number;
  estado: string;

  precio: number;
  cantidad: number;

  razonRechazo: string;

  detalleVotos: Voto[];
  detallePedidos: Pedido[];
}
