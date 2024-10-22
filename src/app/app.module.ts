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
import { ProgramasIndicadores1318Component } from './base/programas-indicadores1318/programas-indicadores1318.component';
import { IndicadorSectorial1924Component } from './base/indicador-sectorial1924/indicador-sectorial1924.component';
import { IndicadorSectorial1318Component } from './base/indicador-sectorial1318/indicador-sectorial1318.component';
import { CarruselComponent } from './base/shared/carrusel/carrusel.component';
import { DetallesInd1924Component } from './base/indicador-sectorial1924/detalles-ind1924/detalles-ind1924.component';
import { DetallesInd1318Component } from './base/indicador-sectorial1318/detalles-ind1318/detalles-ind1318.component';
import { MenuDesplegableComponent } from './base/shared/menu-desplegable/menu-desplegable.component';
import { GraficaComponent } from './base/shared/grafica/grafica.component';
import { PreLoaderComponent } from './base/shared/pre-loader/pre-loader.component';
import { Pnd2013Component } from './plan-nacional/pnd2013/pnd2013.component';
import { LineChartComponent } from './graficas/line-chart/line-chart.component';
import { VistaObjetivoComponent } from './plan-nacional/vista-objetivo/vista-objetivo.component';
import { Indice20132018Component } from './programas-ambito-social/indice20132018/indice20132018.component';
import { DetalleIndicadorComponent } from './programas-ambito-social/detalle-indicador/detalle-indicador.component';
import { DetalleBarraComponent } from './programas-ambito-social/detalle-barra/detalle-barra.component';
import { DetalleInformacionComponent } from './programas-ambito-social/detalle-informacion/detalle-informacion.component';


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
    ProgramasIndicadores1318Component,
    IndicadorSectorial1924Component,
    IndicadorSectorial1318Component,
    CarruselComponent,
    DetallesInd1924Component,
    DetallesInd1318Component,
    MenuDesplegableComponent,
    GraficaComponent,
    PreLoaderComponent,
    Pnd2013Component,
    VistaObjetivoComponent,
    LineChartComponent,
    Indice20132018Component,
    DetalleIndicadorComponent,
    DetalleBarraComponent,
    DetalleInformacionComponent
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
