// Clase ejemplar del módulo de Libros

import { Libro } from './';

export class Ejemplar{
  id: number;
  codigo: string;
  estado: string;
  ingresado: boolean;
  libro: Libro;
}
