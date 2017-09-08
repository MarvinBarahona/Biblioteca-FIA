import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

@Component({
  templateUrl: './adquisicion-nueva.component.html'
})
export class AdquisicionNuevaComponent implements OnInit {

  modalActions1 = new EventEmitter<string | MaterializeAction>();

  openModal1() {
    this.modalActions1.emit({ action: "modal", params: ['open'] });
  }
  closeModal1() {
    this.modalActions1.emit({ action: "modal", params: ['close'] });
  }

  ngOnInit() {
  }

}
