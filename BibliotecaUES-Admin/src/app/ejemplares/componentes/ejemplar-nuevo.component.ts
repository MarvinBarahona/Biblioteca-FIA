import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'ejemplar-nuevo',
  templateUrl: './ejemplar-nuevo.component.html'
})
export class EjemplarNuevoComponent implements OnInit {

  modalActions1 = new EventEmitter<string | MaterializeAction>();

  model1Params = [
    {
      dismissible: false,
      complete: function() { console.log('Closed'); }
    }
  ]

  openModal1() {
    this.modalActions1.emit({ action: "modal", params: ['open'] });
  }
  closeModal1() {
    this.modalActions1.emit({ action: "modal", params: ['close'] });
  }
  
  ngOnInit() {
  }

}
