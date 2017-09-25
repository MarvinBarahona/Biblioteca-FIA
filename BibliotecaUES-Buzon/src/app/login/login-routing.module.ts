import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, NotAllowedComponent, NotFoundComponent } from './componentes';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'error403',
    component: NotAllowedComponent
  },
  {
    path: 'error404',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class LoginRoutingModule { }
