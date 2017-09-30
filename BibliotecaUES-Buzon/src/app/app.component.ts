import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: string;

  constructor(private router: Router) { }

  cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "./login";
  }

  ngOnInit(){
    let u = JSON.parse(sessionStorage.getItem('usuario'));
    if(u) this.usuario = u['nombre'];
  }
}
