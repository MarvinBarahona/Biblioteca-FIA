import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-allowed',
  templateUrl: './not-allowed.component.html',
  styles: [`
    #error403{
      width: 100%;
    }
  `]
})
export class NotAllowedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
