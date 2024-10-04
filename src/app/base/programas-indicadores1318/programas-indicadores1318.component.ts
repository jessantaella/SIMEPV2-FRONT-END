import { DOCUMENT, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DataDynamic } from '../services/dinamic-data.services';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { WINDOW } from '../services/window.service';
import { environment } from 'src/environments/environment';
import { EstadisticasBasicas } from '../Models/EstadisticasBasicass';
import { Sector } from '../Models/Sector';
import { Indicadores1924Service } from '../services/indicadores1924.service';
import { EstadisticasBasicasResponse } from '../ModelsResponse/EstadisticasBasicasResponse';
import { SectorResponse } from '../ModelsResponse/SectorResponse';

@Component({
  selector: 'app-programas-indicadores1318',
  templateUrl: './programas-indicadores1318.component.html',
  styleUrls: ['./programas-indicadores1318.component.scss']
})
export class ProgramasIndicadores1318Component implements OnInit, AfterViewInit{
  nivelSeleccionado: any;
  menuSeleccionado = 1;
  redes: any;
  nombreSistema: any;
  auxMascara = false;
  fontSizeTitulo = '24px';
  fontSizeTituloNormal = '20px';
  isBrowser = false;
  celular = false;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  alto=100;
  esMovil = false;
  esTablet = false;
  esEscritorio = false;

  plantilla = '';

  // Objetos utilizados en vista
  listaEstadisticasBasicas: EstadisticasBasicas[] =[];
  listaSectores: Sector[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: any,
    private scroller: ViewportScroller,
    private servicio: DataDynamic,
    private router: Router,
    
    private breakpointObserver: BreakpointObserver,

    private indicadores1924Service: Indicadores1924Service
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    if (this.isBrowser) {
      this.breakpointObserver
        .observe(['(max-width: 576px)', '(min-width: 577px) and (max-width: 1200px)', '(min-width: 1201px)'])
        .subscribe((result: BreakpointState) => {
          if (result.breakpoints['(max-width: 576px)']) {
            this.esMovil = true;
            this.esTablet = false;
            this.esEscritorio = false;
          } else if (result.breakpoints['(min-width: 577px) and (max-width: 1200px)']) {
            this.esMovil = false;
            this.esTablet = true;
            this.esEscritorio = false;
          } else if (result.breakpoints['(min-width: 1201px)']) {
            // Code for resolution greater than or equal to 993px
            this.esMovil = false;
            this.esTablet = false;
            this.esEscritorio = true;
          }
        });
    }
  }
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setInterval(() => {
        let aux = this.planeacion?.nativeElement.offsetHeight;
        this.alto = aux + aux / 6;
      }, 10);
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      document.body.scrollTop = 0;
      let pos = this.scroller.getScrollPosition();
      if (pos[1] > 0) {
        this.scroller.scrollToPosition([0, 0]);
      }
    }
    this.getEstadisticasBasicas();
    this.getSectores();
  }
  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  //  -------------------------------- OBTENCION DE DATOS ---------------------------------------------------------

  async getEstadisticasBasicas() {
  
    try {
      const res = await this.indicadores1924Service.getConteoSectores4T(0).toPromise();
      const response = (res as EstadisticasBasicasResponse[]).map(estadisticaResponse => 
        this.respuestaAEstadisticaBasica(estadisticaResponse)
      );

      this.listaEstadisticasBasicas = response;
    } catch (err) {
      console.error('Error al obtener los programas sectoriales:', err);
    } finally {
    }
  }

  async getSectores() {
  
    try {
      const res = await this.indicadores1924Service.getSectores4T().toPromise();
      const response = (res as SectorResponse[]).map(sectorResponse => 
        this.respuestaASector(sectorResponse)
      );

      this.listaSectores = response;
    } catch (err) {
      console.error('Error al obtener los programas sectoriales:', err);
    } finally {
    }
  }

  // ---------------------------------------- CONVERSION DE RESPUESTA A MODELOS -----------------------------
  
  respuestaAEstadisticaBasica(estadisticaResponse: EstadisticasBasicasResponse){
    let esatdisticaBasica = new EstadisticasBasicas();
    esatdisticaBasica.CONTEO = estadisticaResponse.CONTEO;
    esatdisticaBasica.TIPO = estadisticaResponse.TIPO;

    this.iniciarAnimacionConteo(esatdisticaBasica, estadisticaResponse.CONTEO || 0);
    return esatdisticaBasica;
  }

  respuestaASector(sectorResponse: SectorResponse){
    let sector = new Sector();
    sector.ID_SECTOR = sectorResponse.ID_SECTOR;
    sector.NOMBRE = sectorResponse.SECTOR;
    const partes = sectorResponse.ICONO?.split('/') || [];
    sector.ICONO = partes[partes?.length -1];
    return sector;
  }

  iniciarAnimacionConteo(estadistica: EstadisticasBasicas, valorFinal: number) {
    const duracion = 2500;
    const incremento = valorFinal / (duracion / 16); 
    let valorActual = 0;

    const animarConteo = () => {
        valorActual += incremento;
        if (valorActual < valorFinal) {
            estadistica.CONTEO = Math.floor(valorActual); 
            requestAnimationFrame(animarConteo); 
        } else {
            estadistica.CONTEO = valorFinal; 
        }
    };

    requestAnimationFrame(animarConteo);
}

  
  

  
}
