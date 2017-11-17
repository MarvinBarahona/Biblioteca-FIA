/*
*Nombre del componente: info-galeria
*Dirección física: src\app\info\componentes\info-galeria.component.ts
**/
import { Component,EventEmitter, ViewChild } from '@angular/core';
import {MaterializeAction} from "angular2-materialize"

declare var $ : any;

@Component({
  selector: 'info-galeria',
  templateUrl: './info-galeria.component.html'
})
export class InfoGaleriaComponent{
  @ViewChild('carousel') carouselElement;
  actions = new EventEmitter<string>();

  imageURLs = [
    "assets/1.jpg",
    "assets/2.png",
    "assets/3.jpg",
    "assets/4.jpg",
    "assets/5.jpg"
  ];

  showInitialized = false;

  constructor() {
    window.setTimeout(() => {
      this.imageURLs = this.imageURLs;
      this.carouselElement.nativeElement.classList.toggle("initialized")
      this.actions.emit("carousel");
    },1000);
  }
}
