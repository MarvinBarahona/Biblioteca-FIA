/*
*Nombre del componente: sugerencias
*Dirección física: src/app/sugerencias/componentes/sugerencias.component.ts
*Objetivo: Mostrar el lsitado de sugerencias.
**/


import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';

import { SugerenciasService, Sugerencia } from './../servicios';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './sugerencias.component.html',
  styles: [`
    .modal{
      height: 250px;
      width: 550px;
    }
  `]
})
export class SugerenciasComponent implements OnInit {
  sugerencias: Sugerencia[];

  modalFinalizar = new EventEmitter<string | MaterializeAction>();

  constructor(
    private router: Router,
    private sugerenciasService: SugerenciasService,
    private pdfmake: PdfmakeService
  ) {
  }

  ngOnInit(): void {
    // Inicializando Tabs
    $('ul.tabs').tabs();

    // Llamar al servicio
    this.sugerenciasService.obtenerTodos().subscribe(
      sugerencias => {
        // Asignar los percances y refrescar la tabla;
        this.sugerencias = sugerencias;
      }
    );
  }

  // Método: filtradas
  // Objetivo: Obtiene sugerencias filtradas por su estado
  filtradas(estado: string){
    let r = this.sugerencias? this.sugerencias.filter((sugerencia) => {return sugerencia.estado == estado}) : null;
    if( r && r.length == 0) r = null;
    return r;
  }

  // Métodos para la ventana modal de confirmación de cierre de ciclo
  openFinalizar(incidente: string) {
    this.modalFinalizar.emit({ action: "modal", params: ['open'] });
  }
  closeFinalizar() {
    this.modalFinalizar.emit({ action: "modal", params: ['close'] });
  }

  // Método: reportar
  // Objetivo: Reportar el ejemplar.
  finalizar() {
    this.sugerenciasService.terminarCiclo().subscribe(
      (msg)=>{
        Materialize.toast("Ciclo terminado", 3000, 'toastSuccess');
        this.reporteRechazos();
        this.reporteSolicitudes();
        // Llamar al servicio
        this.sugerenciasService.obtenerTodos().subscribe(
          sugerencias => {
            // Asignar los percances y refrescar la tabla;
            this.sugerencias = sugerencias;
          }
        );
        this.closeFinalizar();
      },
      (error)=>{
        Materialize.toast("Error al terminar ciclo", 3000, 'toastError');
      }
    );
  }

  //Método: reporteSugerencias
  //Objetivo: Crear el pdf del reporte de sugerencias
  reporteSugerencias(){
    let pendientes = this.filtradas('Pendiente');

    // Configurando las fuentes
    this.pdfmake.configureStyles({ header: { fontSize: 14, bold: true }, title: {bold: true}, header2: {alignment: 'center', bold: true } });

    // Resetar el contenido de la página
    this.pdfmake.docDefinition.content = [];

    // COnfigurar el tamaño y orientación de la páginas
    this.pdfmake.docDefinition.pageSize = "letter";

    // Agregando encabezados
    this.pdfmake.addText('Universidad de El Salvador', 'header');
    this.pdfmake.addText('Biblioteca de Ingeniería y Arquitectura', 'header');
    this.pdfmake.addText('\n\n');
    this.pdfmake.addText('Reporte de sugerencias', 'header2');
    this.pdfmake.addText('Fecha de generación del reporte: ' + (new Date).toLocaleDateString());
    this.pdfmake.addText('\n\n');

    pendientes.forEach((sugerencia, i)=>{
      this.pdfmake.addText("#" + (i+1) + "\t" + sugerencia.titulo + ", " + sugerencia.edicion + "° edición", 'title');
      this.pdfmake.addText("ISBN: " + sugerencia.isbn);
      this.pdfmake.addText("Autor: " + sugerencia.autor);
      this.pdfmake.addText("Precio estimado: " + sugerencia.precio);
      this.pdfmake.addText("Pedidos: " + sugerencia.pedidos + "\tVotos: " + sugerencia.votos);

      this.pdfmake.addText('\n\n');
    });

    // Imprimir el comprobante
    this.pdfmake.download("Reporte de sugerencias al " + (new Date).toLocaleDateString());
  }

  //Método: reporteSolicitudes
  //Objetivo: Crear el pdf del reporte de solicitudes de compra
  reporteSolicitudes(){
    let aceptadas = this.filtradas('Aceptada');

    // Configurando las fuentes
    this.pdfmake.configureStyles({ header: { fontSize: 14, bold: true }, title: {bold: true}, header2: {alignment: 'center', bold: true } });

    // Resetar el contenido de la página
    this.pdfmake.docDefinition.content = [];

    // COnfigurar el tamaño y orientación de la páginas
    this.pdfmake.docDefinition.pageSize = "letter";

    // Agregando encabezados
    this.pdfmake.addText('Universidad de El Salvador', 'header');
    this.pdfmake.addText('Biblioteca de Ingeniería y Arquitectura', 'header');
    this.pdfmake.addText('\n\n');
    this.pdfmake.addText('Reporte de solicitudes de compra', 'header2');
    this.pdfmake.addText('Fecha de generación del reporte: ' + (new Date).toLocaleDateString());
    this.pdfmake.addText('\n\n');

    // Create Headers cells
    const header1 = new Cell('ISBN');
    const header2 = new Cell('Título');
    const header3 = new Cell('Precio');
    const header4 = new Cell('Cantidad');

    // Create headers row
    const headerRows = new Row([header1, header2, header3, header4]);

    let rows = [];

    aceptadas.forEach((sugerencia)=>{
      // Create a content row
      rows.push(new Row([
        new Cell(sugerencia.isbn),
        new Cell(sugerencia.titulo + ", " + sugerencia.edicion + "° edición"),
        new Cell(sugerencia.precio.toString()),
        new Cell(sugerencia.cantidad.toString())
      ]));
    });

    // Custom  column widths
    const widths = [100, '*', 50, 50];

    this.pdfmake.addTable(new Table(headerRows, rows, widths));

    // Imprimir el comprobante
    this.pdfmake.download("Solicitudes de compra al " + (new Date).toLocaleDateString());
  }

  //Método: reporteSolicitudes
  //Objetivo: Crear el pdf del reporte de solicitudes de compra
  reporteRechazos(){
    let aceptadas = this.filtradas('Rechazada');

    // Configurando las fuentes
    this.pdfmake.configureStyles({ header: { fontSize: 14, bold: true }, title: {bold: true}, header2: {alignment: 'center', bold: true } });

    // Resetar el contenido de la página
    this.pdfmake.docDefinition.content = [];

    // COnfigurar el tamaño y orientación de la páginas
    this.pdfmake.docDefinition.pageSize = "letter";

    // Agregando encabezados
    this.pdfmake.addText('Universidad de El Salvador', 'header');
    this.pdfmake.addText('Biblioteca de Ingeniería y Arquitectura', 'header');
    this.pdfmake.addText('\n\n');
    this.pdfmake.addText('Reporte de sugerencias rechazadas', 'header2');
    this.pdfmake.addText('Fecha de generación del reporte: ' + (new Date).toLocaleDateString());
    this.pdfmake.addText('\n\n');

    // Create Headers cells
    const header1 = new Cell('ISBN');
    const header2 = new Cell('Título');
    const header3 = new Cell('Razón');

    // Create headers row
    const headerRows = new Row([header1, header2, header3]);

    let rows = [];

    aceptadas.forEach((sugerencia)=>{
      // Create a content row
      rows.push(new Row([
        new Cell(sugerencia.isbn),
        new Cell(sugerencia.titulo + ", " + sugerencia.edicion + "° edición"),
        new Cell(sugerencia.razonRechazo)
      ]));
    });

    // Custom  column widths
    const widths = [90, '*', 150];

    this.pdfmake.addTable(new Table(headerRows, rows, widths));

    // Imprimir el comprobante
    this.pdfmake.download("Solicitudes rechazadas al " + (new Date).toLocaleDateString());
  }
}
