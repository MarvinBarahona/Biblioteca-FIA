/*
*Nombre del componente: info-tesis
*Dirección física: src\app\info\componentes\info-tesis.component.ts
**/
import { Component } from '@angular/core';

@Component({
  selector: 'info-tesis',
  templateUrl: './info-tesis.component.html',
  styles: [`
      img{
        width: 400px;
        height: 400px;
      }
  `]
})
export class InfoTesisComponent {
  constructor() { }
}
