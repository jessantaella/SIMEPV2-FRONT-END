import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    DiagramaPndComponent,
    ModuloPlaneacionComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AccordionModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/SIMEPS/'},WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
