import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'libro-nuevo',
  templateUrl: './libro-nuevo.component.html'
})

export class LibroNuevoComponent implements OnInit {
  datos : any;
  chipsAutocomplete : any;

  ngOnInit() {
    this.datos = {};
    this.datos['Apple'] = null;
    this.datos['Google'] = null;

    this.chipsAutocomplete = {
      autocompleteOptions: {
        data: this.datos,
        limit: Infinity,
        minLength: 1
      }
    };
  }
}
