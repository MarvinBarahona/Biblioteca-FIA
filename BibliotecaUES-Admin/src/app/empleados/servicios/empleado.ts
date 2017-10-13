/*
*Nombre de la clase: empleado
*Dirección: /src/app/empleados/servicios/empleado.ts
*/

import { Grupo, Politica } from './';

export class Empleado{
  id: number;
  nombre: string;
  correo: string;
  grupo: Grupo;
  politicas: Politica[];
}
