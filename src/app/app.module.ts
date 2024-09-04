import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './base/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InicioComponent } from './base/inicio/inicio.component';
import { DiagramaPndComponent } from './base/diagrama-pnd/diagrama-pnd.component';
import { FooterComponent } from './base/footer/footer.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {APP_BASE_HREF} from '@angular/common';
import { WINDOW_PROVIDERS } from './base/services/window.service';
import { ModuloPlaneacionComponent } from './base/modulo-planeacion/modulo-planeacion.component';
import { PndPlaneacionComponent } from './base/modulo-planeacion/pnd-planeacion/pnd-planeacion.component';
import { ProgramasIndicadores1924Component } from './base/programas-indicadores1924/programas-indicadores1924.component';
import { IndicadorSectorial1924Component } from './base/indicador-sectorial1924/indicador-sectorial1924.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    DiagramaPndComponent,
    PndPlaneacionComponent,
    ModuloPlaneacionComponent,
    FooterComponent,
    ProgramasIndicadores1924Component,
    IndicadorSectorial1924Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AccordionModule,
    FormsModule  
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/SIMEPS/'},WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
