// Clase Empleado

import { Grupo, Politica } from './';

export class Empleado{
  id: number;
  nombre: string;
  correo: string;
  grupo: Grupo;
  politicas: Politica[];
}
