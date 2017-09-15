import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrasladarComponent } from './trasladar/trasladar.component';
import { AppAuthGuard } from './login';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/consultar',
    pathMatch: 'full'
  },
  {
    path: '/trasladar',
    component: TrasladarComponent,
    canActivate: [AppAuthGuard],
    data: {politica: 223}
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
