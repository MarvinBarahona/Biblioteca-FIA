/*
*Nombre del módulo: ejemplar
*Dirección física: src\app\consultas\componentes\ejemplar.component.ts
*Objetivo: Mostrar información de un ejemplar específico
**/
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { CookieService } from 'ngx-cookie';

import { EjemplaresService, Ejemplar, Transaccion }  from './../servicios'

declare var Materialize: any;

@Component({
  templateUrl: './ejemplar.component.html',
  styles: [`
    .modal{
      height: 250px;
      width: 500px;
    }
  `]
})
export class EjemplarComponent implements OnInit {
  ejemplar: Ejemplar;
  motivo: string;

  modalRetirar = new EventEmitter<string|MaterializeAction>();

  constructor(
    private ejemplarService: EjemplaresService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    // Obtiene el id del ejemplar
    let id = this.route.snapshot.params['id'];

    // Llama al servicio
    this.ejemplarService.obtener(id).subscribe(
      ejemplar =>{
        this.ejemplar = ejemplar;
      },
      error =>{
        //Si el ejemplar no existe
        if(error.status == 404){
          this.router.navigate(['/error404'], { skipLocationChange: true });
        }
      }
    );
  }

  // Métodos para la ventana modal de confirmación de retiro
  openRetirar() {
    this.modalRetirar.emit({action:"modal",params:['open']});
  }
  closeRetirar() {
    this.modalRetirar.emit({action:"modal",params:['close']});
  }

  // Método: retirar
  // Objetivo: Retirar el ejemplar.
  retirar(){
    this.ejemplarService.retirar(this.ejemplar, this.motivo).subscribe(
      (message)=>{
        // Agregar la nueva transacción a los pedidos.
        let nuevaTransaccion = new Transaccion;
        nuevaTransaccion.fecha = new Date;
        nuevaTransaccion.usuario = this.obtenerUsuario();
        nuevaTransaccion.tipo = "Retiro";
        nuevaTransaccion.nombre = this.motivo;
        this.ejemplar.transacciones.push(nuevaTransaccion);

        // Cambiar el estado del ejemplar
        this.ejemplar.estado = "Retirado";

        Materialize.toast("Ejemplar retirado", 3000, "toastSuccess");
        // Cerrar el modal
        this.closeRetirar();
      },
      (error)=>{
        Materialize.toast("Error al retirar el ejemplar", 3000, "toastError");
      }
    );
  }

  // Método: obtenerUsuario
  // Objetivo: Obtiene el nombre del usuario actual
  obtenerUsuario(): string{
    let u = this.cookieService.getObject('usuario');
    return u['nombre'];
  }
}
