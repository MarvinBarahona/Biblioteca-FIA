// Clase Libro

import { Catalogo, Ejemplar } from './';

export class Libro{
  id: number;
  isbn: string;
  titulo: string;
  edicion: number;
  autores: string[];
  autor: string;
  editorial: string;
  pais: string;
  anio: number;
  catalogado: boolean;
  catalogo: Catalogo;
  ejemplares: Ejemplar[];
}
