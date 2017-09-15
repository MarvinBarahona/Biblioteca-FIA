// Clase Empleado

import { Politica } from './';

export class Empleado{
  id: number;
  nombre: string;
  correo: string;
  grupo: string;
  politicas: Politica[];
}
