/*
*Nombre del módulo: info
*Dirección física: src/app/info/info.module.ts
*Objetivo: Declarar el módulo de información de la biblioteca
**/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { InfoRoutingModule } from './info-routing.module';
import { InfoRootComponent, InfoInicioComponent, InfoContactoComponent,
          InfoFaqComponent, InfoFormacionComponent, InfoGaleriaComponent,
          InfoHistoriaComponent, InfoSitiosComponent, InfoTesisComponent
        } from './componentes';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MaterializeModule,
    InfoRoutingModule
  ],
  declarations: [
    InfoRootComponent,
    InfoInicioComponent,
    InfoContactoComponent,
    InfoFaqComponent,
    InfoFormacionComponent,
    InfoGaleriaComponent,
    InfoHistoriaComponent,
    InfoSitiosComponent,
    InfoTesisComponent,
    InfoTesisComponent,    
  ],
  providers: []
})
export class InfoModule { }
