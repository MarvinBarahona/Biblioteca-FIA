import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'libro-nuevo',
  templateUrl: './libro-nuevo.component.html',
  styleUrls: ['./libro-nuevo.component.css']
})
export class LibroNuevoComponent implements OnInit {

  chipsAutocomplete = {
    placeholder: "Otro Autor",
    secondaryPlaceholder: 'Autores',
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null,
        'Asia': null,
      },
      limit: Infinity,
      minLength: 1
    }
  };

  ngOnInit() {
  }

}
