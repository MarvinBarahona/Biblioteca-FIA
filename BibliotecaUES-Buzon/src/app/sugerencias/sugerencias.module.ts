import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';
import { DataTablesModule } from 'angular-datatables';

import { SugerenciasRoutingModule } from './sugerencias-routing.module';
import { SugerenciasRootComponent, SugerenciasComponent, SugerenciaComponent, SugerenciaNuevaEstudianteComponent, SugerenciaNuevaDocenteComponent} from './componentes';
import { SugerenciasService } from './servicios';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    DataTablesModule,
    MaterializeModule,
    SugerenciasRoutingModule
  ],
  declarations: [
    SugerenciasRootComponent,
    SugerenciasComponent,
    SugerenciaComponent,
    SugerenciaNuevaEstudianteComponent,
    SugerenciaNuevaDocenteComponent
  ],
  providers: [
    SugerenciasService
  ]
})
export class SugerenciasModule { }
