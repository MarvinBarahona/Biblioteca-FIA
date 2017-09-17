import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasladarComponent } from './trasladar.component';
import { AppAuthGuard } from './../login'

const routes: Routes = [
  {
    path: 'trasladar',
    component: TrasladarComponent,
    canActivate: [AppAuthGuard],
    data: { politica: 143 }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})

export class TrasladarRoutingModule { }
