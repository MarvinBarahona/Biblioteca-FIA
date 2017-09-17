import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAuthGuard } from './login';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/consultar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: [],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
